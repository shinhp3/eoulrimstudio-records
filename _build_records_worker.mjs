/**
 * 소스(index.html + styles.css)를 인라인한 worker.js를 생성합니다.
 * 배포 전에 실행: node _build_records_worker.mjs
 * 생성된 worker.js는 .gitignore 처리됩니다.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(path.dirname(__dirname), "eoulrimstudio-records");
fs.mkdirSync(outDir, { recursive: true });

let html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const css = fs.readFileSync(path.join(__dirname, "styles.css"), "utf8");

html = html.replace(
  '<link rel="stylesheet" href="styles.css" />',
  `<style>\n${css}\n</style>`
);
html = html.replace(
  /const RECORDS_WORKER_BASE\s*=\s*"[^"]*"\s*;/,
  'const RECORDS_WORKER_BASE = "";'
);

function escapeForTemplateLiteral(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const workerCore = String.raw`
/**
 * eoulrimstudio-records — Cloudflare Worker (단일 파일, import 없음)
 *
 * 라우트: GET / (계산기 HTML·인라인 CSS), GET/PUT /records, OPTIONS
 * 환경 변수:
 *   GITHUB_TOKEN
 *   GITHUB_USERNAME
 *   GITHUB_RECORDS_REPO
 */

const GITHUB_API = "https://api.github.com";
const DEFAULT_BRANCH = "main";

function corsHeaders(extra) {
  const base = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (extra && typeof extra === "object") Object.assign(base, extra);
  return base;
}

function jsonResponse(obj, status, extraHeaders) {
  status = status == null ? 200 : status;
  return new Response(JSON.stringify(obj), {
    status: status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(extraHeaders),
    },
  });
}

function gitContentsPath(relPath) {
  return relPath
    .split("/")
    .filter(Boolean)
    .map(function (s) {
      return encodeURIComponent(s);
    })
    .join("/");
}

function githubHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: "Bearer " + token,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "eoulrimstudio-records-worker",
  };
}

async function githubJson(method, url, token, bodyObj) {
  var opts = {
    method: method,
    headers: Object.assign({}, githubHeaders(token)),
  };
  if (bodyObj !== undefined) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(bodyObj);
  }

  var res = await fetch(url, opts);
  var text = await res.text();
  var data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = { message: text };
  }
  var err = new Error((data && data.message) || res.statusText || "HTTP " + res.status);
  err.status = res.status;
  err.data = data;
  if (!res.ok) throw err;
  return data;
}

function recordsUtf8ToBase64(str) {
  var bytes = new TextEncoder().encode(str);
  var bin = "";
  for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function requireRecordsEnv(env) {
  var token = env.GITHUB_TOKEN;
  var username = env.GITHUB_USERNAME;
  var repo = env.GITHUB_RECORDS_REPO;
  if (!token || !username || !repo) {
    var e = new Error("GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_RECORDS_REPO 설정을 확인해 주세요.");
    e.status = 500;
    throw e;
  }
  return { token: token, username: username, repo: repo };
}

async function handleGetRecords(env) {
  try {
    var cred = requireRecordsEnv(env);
    var apiPath =
      GITHUB_API +
      "/repos/" +
      cred.username +
      "/" +
      cred.repo +
      "/contents/" +
      gitContentsPath("records.json") +
      "?ref=" +
      encodeURIComponent(DEFAULT_BRANCH);

    var data;
    try {
      data = await githubJson("GET", apiPath, cred.token);
    } catch (e) {
      if (e.status === 404) {
        var emptyBody = JSON.stringify({ records: [] });
        return new Response(emptyBody, {
          headers: Object.assign(
            { "Content-Type": "application/json; charset=utf-8" },
            corsHeaders()
          ),
        });
      }
      throw e;
    }

    if (!data.content || data.encoding !== "base64") {
      return jsonResponse({ success: false, error: "GitHub 응답 형식이 올바르지 않습니다." }, 502);
    }

    var binStr = atob(String(data.content).replace(/\s/g, ""));
    var u8 = new Uint8Array(binStr.length);
    for (var i = 0; i < binStr.length; i++) u8[i] = binStr.charCodeAt(i);
    var text = new TextDecoder("utf-8").decode(u8);
    var sha = typeof data.sha === "string" ? data.sha : "";

    var h = corsHeaders({
      "Access-Control-Expose-Headers": "X-GitHub-Content-Sha",
    });
    if (sha) h["X-GitHub-Content-Sha"] = sha;

    return new Response(text, {
      headers: Object.assign({ "Content-Type": "application/json; charset=utf-8" }, h),
    });
  } catch (e) {
    var msg = e.message || String(e);
    var st = e.status >= 400 && e.status < 600 ? e.status : 500;
    return jsonResponse({ success: false, error: msg }, st);
  }
}

async function handlePutRecords(request, env) {
  try {
    var cred = requireRecordsEnv(env);
    var body;
    try {
      body = await request.json();
    } catch (e2) {
      return jsonResponse({ success: false, error: "JSON 본문을 읽을 수 없습니다." }, 400);
    }

    if (!Array.isArray(body.records)) {
      return jsonResponse({ success: false, error: "records 배열이 필요합니다." }, 400);
    }

    var payload = JSON.stringify({ records: body.records }, null, 2);
    var content = recordsUtf8ToBase64(payload);
    var apiPath =
      GITHUB_API +
      "/repos/" +
      cred.username +
      "/" +
      cred.repo +
      "/contents/" +
      gitContentsPath("records.json");

    var putBody = {
      message: "Update records.json",
      content: content,
      branch: DEFAULT_BRANCH,
    };
    if (typeof body.sha === "string" && body.sha.length > 0) putBody.sha = body.sha;

    await githubJson("PUT", apiPath, cred.token, putBody);
    return jsonResponse({ success: true });
  } catch (e) {
    var msg = e.message || String(e);
    var st = 500;
    if (typeof e.status === "number" && e.status >= 400 && e.status < 600) st = e.status;
    return jsonResponse({ success: false, error: msg }, st);
  }
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    var url = new URL(request.url);
    var path = url.pathname;

    if (path === "/records" && request.method === "GET") {
      return handleGetRecords(env);
    }

    if (path === "/records" && request.method === "PUT") {
      return handlePutRecords(request, env);
    }

    if ((path === "/" || path === "/index.html") && request.method === "GET") {
      return new Response(INDEX_HTML, {
        headers: Object.assign(
          { "Content-Type": "text/html; charset=utf-8" },
          corsHeaders()
        ),
      });
    }

    return jsonResponse({ success: false, error: "Not Found" }, 404);
  },
};
`.replace(/\r\n/g, "\n");

const finalWorker =
  "const INDEX_HTML = `" +
  escapeForTemplateLiteral(html) +
  "`;\n\n" +
  workerCore;

fs.writeFileSync(path.join(outDir, "worker.js"), finalWorker, "utf8");
console.log("Wrote", path.join(outDir, "worker.js"));
