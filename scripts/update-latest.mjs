// 更新 compat/catalog.json 的「官方最新版本」：向 npm registry 查三個 CLI 的 latest。
// 只改 latest 與 updated；已驗證版本、模型、推理等級與公告由人工驗證後更新。
// 用法：node scripts/update-latest.mjs（有變動時回傳 0 並改寫檔案；GitHub Action 每天執行）
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../compat/catalog.json", import.meta.url);
const PACKAGES = { "claude-code": "@anthropic-ai/claude-code", codex: "@openai/codex", "gemini-cli": "@google/gemini-cli" };
const VERSION = /^\d{1,4}\.\d{1,4}\.\d{1,6}$/;

const catalog = JSON.parse(readFileSync(FILE, "utf8"));
let changed = false;
for (const [id, pkg] of Object.entries(PACKAGES)) {
  const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`${pkg}: HTTP ${res.status}`);
  const { version } = await res.json();
  if (typeof version !== "string" || !VERSION.test(version)) throw new Error(`${pkg}: 版本格式不正確 ${version}`);
  const cli = (catalog.clis[id] ??= { verified: [], models: [], reasoningLevels: [] });
  if (cli.latest !== version) {
    console.log(`${id}: ${cli.latest ?? "(none)"} -> ${version}`);
    cli.latest = version;
    changed = true;
  }
}
if (changed) {
  catalog.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(FILE, `${JSON.stringify(catalog, null, 2)}\n`);
}
console.log(changed ? "catalog updated" : "no change");
