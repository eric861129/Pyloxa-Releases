// 更新 compat/catalog.json 的「官方最新版本」（GitHub Action 每 6 小時執行）：
// - 三個 CLI：npm registry 的 latest
// - Node.js：nodejs.org 的最新 LTS；最低版本取三個 CLI 的 npm engines.node 中最高的那個（一鍵安裝需要）
// - git：Git for Windows 在 GitHub 的最新 release（tag 例如 v2.56.0.windows.4）
// 已驗證版本、模型、推理等級、git 的最低版本與公告由人工驗證後更新。
// 用法：node scripts/update-latest.mjs（有變動時改寫檔案）；環境變數 GITHUB_TOKEN 可避免 GitHub API 的次數限制
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../compat/catalog.json", import.meta.url);
const PACKAGES = { "claude-code": "@anthropic-ai/claude-code", codex: "@openai/codex", "gemini-cli": "@google/gemini-cli" };
const VERSION = /^\d{1,4}\.\d{1,4}\.\d{1,6}$/;

async function json(url, headers = {}) {
  const res = await fetch(url, { headers: { accept: "application/json", ...headers }, signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

/** ">=22.0.0"、">=20"、"^18.17 || >=20" 這類寫法中的最低主版本，轉成 x.y.z */
function engineMinimum(range) {
  if (typeof range !== "string") return undefined;
  const versions = [...range.matchAll(/>=?\s*v?(\d+)(?:\.(\d+))?(?:\.(\d+))?/g)].map((m) => `${m[1]}.${m[2] ?? 0}.${m[3] ?? 0}`);
  return versions.sort(compare)[0];
}

function compare(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

const catalog = JSON.parse(readFileSync(FILE, "utf8"));
let changed = false;
const set = (obj, key, value, label) => {
  if (value === undefined || obj[key] === value) return;
  console.log(`${label}: ${obj[key] ?? "(none)"} -> ${value}`);
  obj[key] = value;
  changed = true;
};

const nodeMinimums = [];
for (const [id, pkg] of Object.entries(PACKAGES)) {
  const meta = await json(`https://registry.npmjs.org/${pkg}/latest`);
  if (typeof meta.version !== "string" || !VERSION.test(meta.version)) throw new Error(`${pkg}: 版本格式不正確 ${meta.version}`);
  const cli = (catalog.clis[id] ??= { verified: [], models: [], reasoningLevels: [] });
  set(cli, "latest", meta.version, id);
  const min = engineMinimum(meta.engines?.node);
  if (min) nodeMinimums.push(min);
}

catalog.tools ??= {};
const node = (catalog.tools.node ??= { download: "https://nodejs.org/" });
const lts = (await json("https://nodejs.org/dist/index.json")).find((r) => r.lts);
const ltsVersion = lts?.version?.replace(/^v/, "");
if (!ltsVersion || !VERSION.test(ltsVersion)) throw new Error(`Node.js LTS 版本格式不正確：${lts?.version}`);
set(node, "latest", ltsVersion, "node");
set(node, "minimum", nodeMinimums.sort(compare).at(-1), "node minimum");

const git = (catalog.tools.git ??= { download: "https://git-scm.com/downloads/win" });
const token = process.env.GITHUB_TOKEN;
const release = await json("https://api.github.com/repos/git-for-windows/git/releases/latest", token ? { authorization: `Bearer ${token}` } : {});
const gitVersion = /^v?(\d+\.\d+\.\d+)/.exec(release.tag_name ?? "")?.[1];
if (!gitVersion) throw new Error(`Git for Windows 的版本格式不正確：${release.tag_name}`);
set(git, "latest", gitVersion, "git");

if (changed) {
  catalog.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(FILE, `${JSON.stringify(catalog, null, 2)}\n`);
}
console.log(changed ? "catalog updated" : "no change");
