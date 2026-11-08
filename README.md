# Pyloxa

Pyloxa is a free Windows app for working with several AI coding agents from one conversation.
You describe the work once. A brain agent reads your project and proposes a plan; your routing rules decide whether each task goes to Claude Code, Codex CLI or Gemini CLI; Pyloxa runs each task on your own subscription or API key in its own git worktree and checks the result before anything is merged.

Website: [pyloxa.com](https://pyloxa.com). This repository hosts the installers, release notes and the issue tracker. The source code is not public.

[繁體中文說明](#繁體中文)

## Download

Get `Pyloxa-Setup-<version>.exe` from the [latest release](https://github.com/eric861129/Pyloxa-Releases/releases/latest).

## Requirements

- Windows 10 or 11, 64-bit
- [Git for Windows](https://git-scm.com/download/win)
- At least one agent CLI, installed and signed in with your subscription (or set up with your own API key in Pyloxa):
  - [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (`claude`), tested with 2.1.316–2.1.318
  - [Codex CLI](https://developers.openai.com/codex/cli) (`codex`), tested with 0.166.0
- Optional, experimental: [Gemini CLI](https://github.com/google-gemini/gemini-cli) (`gemini`) with your own paid Gemini API key, tested with 0.42.0, 0.66.0 and 0.67.0. Google account sign-in and AI Pro or Ultra subscriptions are not supported.
- Optional: [GitHub CLI](https://cli.github.com/) (`gh`), signed in, for pull requests and CI status

Other patch versions in the same series (for example Claude Code 2.1.x) run without a warning.

New installs start with a default flow: Claude Code is the brain and handles frontend work and video editing, and Codex handles backend work and image generation. Writing, docs and anything else go to the brain, and so do tasks for an agent you haven't set up. The setup wizard adjusts this to the agents you have, and you can change it any time on the **Routing rules** page.

## Install

1. Download the installer from the release page.
2. Optional: check the file against the SHA-256 listed in the release notes.

   ```powershell
   Get-FileHash .\Pyloxa-Setup-0.1.8.exe -Algorithm SHA256
   ```

3. Run the installer. It is not code-signed yet, so Windows SmartScreen may say "Windows protected your PC". Choose **More info**, then **Run anyway**.
4. Pyloxa installs for the current user and does not need administrator rights. Your run history and projects are stored in `%APPDATA%\Pyloxa` and are kept when you uninstall.

Pyloxa does not update itself yet. It tells you when a new version is out; download it from this page.

## First run

1. Open Pyloxa. A setup wizard checks git and Node.js, can install the agent CLIs with their official npm commands, and shows the sign-in command to copy into a terminal (`claude auth login` or `codex login`); it re-detects when you come back. Then you pick the brain and who does what. You can reopen the wizard from **Settings**, and the **Connections** page shows each CLI's status.
   To pay per use instead of a subscription, choose **Use an API key** for that CLI on the **Connections** page. Gemini CLI always uses an API key.
2. Open a project folder that is a git repository.
3. Describe what you want done. The brain reads the project first and asks before it plans anything big.

## Costs, privacy and credentials

- Pyloxa is free. Agent usage counts against your own Claude and ChatGPT subscriptions, or against your own API key if you choose one; Pyloxa does not resell or proxy any AI service.
- Pyloxa has no server and collects no telemetry. Your code goes only where the CLIs send it, under Anthropic's, OpenAI's and Google's terms.
- Pyloxa asks GitHub for the latest Pyloxa version and the [CLI compatibility catalog](#cli-compatibility-catalog) at startup and every 12 hours, with no project or usage data. Turn it off in **Settings → Notifications and updates**.
- When Codex is installed and signed in with a subscription, the usage meter asks Codex CLI for your remaining Codex usage every 10 minutes while Pyloxa is open. Codex gets it from OpenAI with your own sign-in, and it uses none of your quota. Turn off the usage meter in **Settings → Appearance** to stop these checks.
- Shared memory stays on your computer. Memories are added to the prompts of every agent you use, so they reach each of those agents' providers.
- In the free version, the **Skills** page reads only the skills folders of each CLI and of the open project, and changes nothing.
- Usage statistics in **Settings** are computed on your computer and never sent.
- Pyloxa checks sign-in status with each CLI's own command. It never reads, copies or sends CLI tokens or credential files.
- If you add an API key, Pyloxa encrypts it with Windows secure storage and passes it only to the CLI process that runs your work.
- Gemini CLI runs in a separate settings folder that allows only your API key, so Pyloxa never uses a Google account sign-in or subscription.
- Agents work in separate git worktrees. Pyloxa never stashes, resets or checks out your working directory, and nothing is merged or pushed until you choose to.

## CLI compatibility catalog

[`compat/catalog.json`](compat/catalog.json) tells Pyloxa which CLI versions have been verified, the latest official version of each CLI, the latest and minimum versions of git and Node.js, suggested model names and reasoning levels, and any notices. Pyloxa reads it together with the update check, so new CLI versions and models don't have to wait for a Pyloxa release. A GitHub Action updates the latest versions every 6 hours; verified versions are added only after testing.

## Reporting a problem

[Open an issue](https://github.com/eric861129/Pyloxa-Releases/issues/new/choose) and include your Pyloxa version, Windows version and CLI versions. In Pyloxa, **Settings → Usage and feedback → Copy diagnostics** copies all of them, with no project data.
Never paste tokens, API keys or code you cannot share publicly.

Support for the free version is best effort, with no guaranteed response time.
Report security vulnerabilities privately, as described in [SECURITY.md](SECURITY.md).

## License

The free version is provided under the [End User License Agreement](EULA.txt). Third-party notices are installed with the app as `THIRD_PARTY_NOTICES.txt`.

Pyloxa is not affiliated with or endorsed by Anthropic, OpenAI or Google. Claude Code is a product of Anthropic. Codex is a product of OpenAI. Gemini is a product of Google.

---

## 繁體中文

Pyloxa 是免費的 Windows App，讓你在一段對話裡同時和多個 AI 程式 Agent 合作。
把要做的事說一次：大腦 Agent 會先讀過專案、提出計畫；你的派工規則決定每個工作交給 Claude Code、Codex CLI 或 Gemini CLI；Pyloxa 用你自己的訂閱或 API Key，在各自獨立的 git worktree 執行每個工作，並在合併前檢查成果。

官網：[pyloxa.com](https://pyloxa.com)。這個 repo 只放安裝檔、版本說明與問題回報，原始碼不公開。

### 下載

到[最新版本](https://github.com/eric861129/Pyloxa-Releases/releases/latest)下載 `Pyloxa-Setup-<版本>.exe`。

### 系統需求

- Windows 10 或 11（64 位元）
- [Git for Windows](https://git-scm.com/download/win)
- 至少一個已安裝並以訂閱帳號登入的 Agent CLI（也可以在 Pyloxa 改用自己的 API Key）：
  - [Claude Code](https://docs.anthropic.com/en/docs/claude-code)（`claude`），已測試 2.1.316–2.1.318
  - [Codex CLI](https://developers.openai.com/codex/cli)（`codex`），已測試 0.166.0
- 選用、實驗性：[Gemini CLI](https://github.com/google-gemini/gemini-cli)（`gemini`），搭配你自己的付費 Gemini API Key，已測試 0.42.0、0.66.0 與 0.67.0。不支援 Google 帳號登入與 AI Pro、Ultra 訂閱。
- 選用：已登入的 [GitHub CLI](https://cli.github.com/)（`gh`），用來建立 pull request 與查看 CI 結果

同系列的其他修補版（例如 Claude Code 2.1.x）不會顯示警告。

新安裝時會套用預設流程：Claude Code 擔任大腦，負責前端與影片剪輯；Codex 負責後端與生圖。文章、文件與其他工作交給大腦，還沒設定的 Agent 的工作也交給大腦。設定精靈會依你有的 Agent 調整，之後也可以隨時在「派工規則」頁修改。

### 安裝

1. 從版本頁下載安裝檔。
2. 選用：比對安裝檔與版本說明裡的 SHA-256。

   ```powershell
   Get-FileHash .\Pyloxa-Setup-0.1.8.exe -Algorithm SHA256
   ```

3. 執行安裝檔。安裝檔目前還沒有程式碼簽章，Windows SmartScreen 可能顯示「Windows 已保護您的電腦」，請按「其他資訊」，再按「仍要執行」。
4. Pyloxa 安裝在目前的使用者底下，不需要系統管理員權限。執行紀錄與開過的專案存在 `%APPDATA%\Pyloxa`，解除安裝時會保留。

Pyloxa 目前不會自動更新。有新版本時 Pyloxa 會提示你，請到這個頁面下載。

### 第一次使用

1. 開啟 Pyloxa。設定精靈會檢查 git 與 Node.js，可以用官方的 npm 命令安裝 Agent CLI，並提供可以複製到終端機的登入指令（`claude auth login` 或 `codex login`），回到 Pyloxa 時自動重新偵測；接著選大腦與分工。設定精靈可以從「設定」重新開啟，「連線」頁會顯示每個 CLI 的狀態。
   想按用量付費、不用訂閱的話，在「連線」頁把那個 CLI 改成「改用 API Key」。Gemini CLI 一律使用 API Key。
2. 開啟一個 git repo 的專案資料夾。
3. 說出你想完成的事。大腦會先讀過專案，規模大一點的計畫會先問過你。

### 費用、隱私與憑證

- Pyloxa 免費。Agent 的用量算在你自己的 Claude 與 ChatGPT 訂閱裡，或改用你自己的 API Key；Pyloxa 不轉售、也不代理任何 AI 服務。
- Pyloxa 沒有伺服器，也不收集使用資料。你的程式碼只會送到 CLI 原本會送去的地方，適用 Anthropic、OpenAI 與 Google 的條款。
- Pyloxa 啟動時和每 12 小時會向 GitHub 查詢最新版本與 [CLI 相容性目錄](#cli-相容性目錄)，不含任何專案或使用資料；可以在「設定 → 通知與更新」關閉。
- Codex 已安裝並以訂閱登入時，Pyloxa 開著的期間，額度一覽每 10 分鐘會請 Codex CLI 查詢 Codex 的剩餘額度；Codex 用你自己的登入向 OpenAI 取得，不消耗額度。在「設定 → 外觀」關閉額度一覽就不再查詢。
- 共用記憶只存在你的電腦。記憶會帶進你使用的每個 Agent 的 prompt，所以會送到這些 Agent 的供應商。
- 免費版的「Skills」頁只讀取各 CLI 與開啟中專案的 Skills 資料夾，不做任何修改。
- 「設定」頁的使用統計只在你的電腦計算，不會傳送。
- Pyloxa 只用各 CLI 自己的指令查詢登入狀態，從不讀取、複製或傳送 CLI 的 token 與憑證檔。
- 你設定的 API Key 會以 Windows 的安全儲存加密，只交給執行工作的 CLI 程序。
- Gemini CLI 在只允許你的 API Key 的獨立設定資料夾中執行，Pyloxa 不會使用 Google 帳號登入或訂閱。
- Agent 在獨立的 git worktree 工作。Pyloxa 不會對你的工作目錄執行 stash、reset 或 checkout；要不要合併、要不要推送，都由你決定。

### CLI 相容性目錄

[`compat/catalog.json`](compat/catalog.json) 記錄 Pyloxa 驗證過的 CLI 版本、各 CLI 的官方最新版本、git 與 Node.js 的最新與最低版本、建議的模型名稱與推理等級，以及公告。Pyloxa 在查詢新版本時一起讀取，所以 CLI 或模型的更新不必等 Pyloxa 發新版。官方最新版本由 GitHub Action 每 6 小時更新；已驗證的版本要實際測試過才加入。

### 回報問題

請[開一個 issue](https://github.com/eric861129/Pyloxa-Releases/issues/new/choose)，附上 Pyloxa 版本、Windows 版本與 CLI 版本。在 Pyloxa 的「設定 → 使用統計與回報 → 複製診斷資訊」可以一次複製這些資訊，不含任何專案資料。
請勿貼上 token、API Key，或不能公開的程式碼。

免費版的支援盡力而為，不保證回覆時間。安全性漏洞請依 [SECURITY.md](SECURITY.md) 私下回報。

### 授權

免費版依[使用者授權合約](EULA.txt)提供。第三方軟體聲明隨 App 安裝，檔名為 `THIRD_PARTY_NOTICES.txt`。

Pyloxa 與 Anthropic、OpenAI、Google 沒有關係，也未獲得它們的背書。Claude Code 是 Anthropic 的產品，Codex 是 OpenAI 的產品，Gemini 是 Google 的產品。
