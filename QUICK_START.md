# 🚀 快速開始 - 5 分鐘設置

如果你想快速上手，請按照以下步驟操作：

## 步驟 1：準備 Google 試算表（2 分鐘）

1. 打開 https://sheets.google.com
2. 點擊「建立新試算表」
3. 命名為 `單字管理系統`
4. 複製 URL 中的試算表 ID：
   ```
   https://docs.google.com/spreadsheets/d/[複製這部分]/edit
   ```

## 步驟 2：設置 Google Apps Script（2 分鐘）

1. 打開試算表，點擊「延伸程式集」→「Apps Script」
2. 刪除預設程式碼
3. 複製 [GoogleAppScript.gs](./GoogleAppScript.gs) 的所有程式碼
4. 在第 5 行替換試算表 ID：
   ```javascript
   const SPREADSHEET_ID = '[你的試算表ID]';
   ```
5. 點擊「執行」，選擇 `initializeSpreadsheet` 函數並執行
6. 授予權限

## 步驟 3：部署 Web App（1 分鐘）

1. 點擊「部署」→「新增部署」
2. 類型選擇「Web 應用程式」
3. **具有以下存取權的使用者** 選擇「任何人」
4. 點擊「部署」
5. 複製顯示的部署 URL

## 步驟 4：配置前端表單（1 分鐘）

1. 打開 [word-form.html](./word-form.html)
2. 找到第 168 行：
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APP_SCRIPT_URL_HERE';
   ```
3. 替換為你的 Web App URL：
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_ID/userweb';
   ```
4. 儲存檔案

## 步驟 5：測試（1 分鐘）

1. 在瀏覽器中打開 `word-form.html`
2. 填寫表單：
   - 英文單字：`hello`
   - 中文翻譯：`你好`
   - 字根分析：`來自古英語`
   - 例句：`Hello, how are you?`
   - 詞性：`感嘆詞 (Interjection)`
3. 點擊「💾 儲存單字」
4. 看到「✅ 成功」訊息即完成！

## ✅ 完成了！

你現在可以：
- ✅ 透過表單新增單字
- ✅ 資料自動保存到 Google 試算表
- ✅ 隨時檢查試算表中的所有單字

## 📖 詳細說明

如需更詳細的配置說明，請參考 [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

**遇到問題？** 檢查 [SETUP_GUIDE.md](./SETUP_GUIDE.md) 中的「故障排除」部分
