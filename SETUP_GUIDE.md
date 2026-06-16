# 單字管理系統 - 完整配置指南

## 📋 目錄
1. [系統概述](#系統概述)
2. [前置準備](#前置準備)
3. [Google App Script 設置](#google-app-script-設置)
4. [前端表單配置](#前端表單配置)
5. [工作流程](#工作流程)
6. [故障排除](#故障排除)
7. [高級功能](#高級功能)

---

## 系統概述

### 架構圖
```
┌─────────────────────┐
│   前端表單          │
│ (HTML/CSS/JS)       │
│  word-form.html     │
└──────────┬──────────┘
           │
           │ POST 請求
           │ (JSON 資料)
           ▼
┌─────────────────────┐
│  Google App Script  │
│   (後端處理)        │
│  GoogleAppScript.gs │
└──────────┬──────────┘
           │
           │ 寫入
           ▼
┌─────────────────────┐
│  Google 試算表      │
│  (資料儲存)         │
│ (單字資料表)        │
└─────────────────────┘
```

### 表單欄位
- **英文單字**：要新增的英文詞彙
- **中文翻譯**：對應的中文翻譯
- **字根分析**：詞根、詞綴組成說明
- **例句**：使用該單字的例句
- **詞性**：名詞、動詞、形容詞等

---

## 前置準備

### 需要的工具和帳號
- [ ] Google 帳號（用於 Google Apps Script 和 Google 試算表）
- [ ] 瀏覽器（Chrome、Firefox、Safari 等）
- [ ] 文字編輯器（可選，用於編輯程式碼）

### 需要獲取的資訊
1. **試算表 ID**
2. **Google App Script 部署 URL**

---

## Google App Script 設置

### 第 1 步：建立 Google 試算表

1. 前往 [Google 試算表](https://sheets.google.com)
2. 點擊「建立新試算表」(新增表)
3. 命名為：`單字管理系統` 或任何你喜歡的名字
4. 記錄試算表的 **ID**（位於 URL 中）
   ```
   URL: https://docs.google.com/spreadsheets/d/[試算表ID]/edit
                                              └─ 複製這個部分
   ```

### 第 2 步：建立 Google Apps Script 專案

1. 打開建立的試算表
2. 點擊「延伸程式集」> 「Apps Script」
3. 會開啟一個新的 Apps Script 編輯器分頁
4. 刪除預設的程式碼（`function myFunction(){}`）

### 第 3 步：複製並貼上後端程式碼

1. 複製 [GoogleAppScript.gs](./GoogleAppScript.gs) 中的所有程式碼
2. 將程式碼貼到 Apps Script 編輯器中

### 第 4 步：配置試算表 ID

1. 在 Apps Script 編輯器中找到這一行：
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```

2. 將 `YOUR_SPREADSHEET_ID_HERE` 替換為你的試算表 ID
   ```javascript
   const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';
   ```

3. 確保工作表名稱設置正確（通常是 `'單字資料'`）：
   ```javascript
   const SHEET_NAME = '單字資料';
   ```

### 第 5 步：初始化試算表

1. 在 Apps Script 編輯器中選擇函數下拉選單，選擇 `initializeSpreadsheet`
2. 點擊「執行」按鈕 ▶️
3. 首次運行會要求授予權限，點擊「檢閱權限」
4. 選擇你的 Google 帳號
5. 點擊「允許」
6. 等待執行完成

**結果**：試算表中會自動建立 `'單字資料'` 工作表，並添加標題行

### 第 6 步：部署為 Web App

1. 在 Apps Script 編輯器中，點擊「部署」> 「新增部署」
2. 點擊齒輪圖標，選擇「Web 應用程式」
3. 設定如下：
   - **以下身份執行**：選擇你的 Google 帳號
   - **具有以下存取權的使用者**：選擇「任何人」
4. 點擊「部署」
5. 複製部署的 URL（看起來像這樣）：
   ```
   https://script.google.com/macros/d/[SCRIPT_ID]/userweb
   ```

**重要**：保存這個 URL，下一步會用到

### 第 7 步：授予 Web App 權限

1. 部署完成後會看到「新部署已完成」對話框
2. 點擊授權連結進行授權
3. 授權後會得到最終的 Web App URL

---

## 前端表單配置

### 第 1 步：打開前端檔案

1. 使用瀏覽器打開 [word-form.html](./word-form.html)
2. 或在任何網頁伺服器上託管此檔案

### 第 2 步：配置 Google App Script URL

1. 打開 `word-form.html`，找到這一行（大約在第 168 行）：
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APP_SCRIPT_URL_HERE';
   ```

2. 將其替換為你的 Google App Script 部署 URL：
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb';
   ```

### 第 3 步：測試表單

1. 刷新 HTML 頁面
2. 填入以下測試資料：
   - 英文單字：`perseverance`
   - 中文翻譯：`堅持不懈`
   - 字根分析：`persist(堅持) + ance(名詞後綴) = 堅持的質量`
   - 例句：`Her perseverance in learning English impressed everyone.`
   - 詞性：`名詞 (Noun)`

3. 點擊「💾 儲存單字」按鈕
4. 如果看到「✅ 成功：單字已儲存到試算表」訊息，表示配置成功！

---

## 工作流程

### 管理者的操作步驟

```
1. 打開前端表單 (word-form.html)
   ↓
2. 填寫表單欄位
   ├─ 英文單字
   ├─ 中文翻譯
   ├─ 字根分析
   ├─ 例句
   └─ 詞性
   ↓
3. 點擊「💾 儲存單字」
   ↓
4. 前端驗證資料
   ├─ 檢查必填欄位
   └─ 格式驗證
   ↓
5. 發送 POST 請求到 Google App Script
   └─ 包含 JSON 格式的單字資料
   ↓
6. Google App Script 接收並處理資料
   ├─ 驗證資料完整性
   ├─ 建立/確認工作表
   └─ 寫入試算表
   ↓
7. 返回成功訊息
   ↓
8. 表單重置，顯示成功訊息
   ↓
9. 管理者可以繼續新增其他單字
```

### 資料流向

```
HTML 表單
   ├─ 收集用戶輸入
   ├─ 進行客戶端驗證
   └─ 發送 JSON 資料
        │
        ▼
   Google App Script
   ├─ 解析 JSON 資料
   ├─ 伺服器端驗證
   └─ 存取 Google 試算表
        │
        ▼
   Google 試算表
   ├─ 建立/確認工作表
   ├─ 添加資料列
   └─ 保存資料
```

---

## 故障排除

### 常見問題

#### ❌ 問題 1：提交表單後看到 「無法連接到伺服器」錯誤

**可能原因：**
- Google App Script URL 未正確設置
- 部署的 Web App 不是「任何人」都能訪問

**解決方案：**
1. 確認 `GOOGLE_SCRIPT_URL` 變數設置正確
2. 在 Apps Script 編輯器中檢查部署設置
3. 重新部署並確保設置為「具有以下存取權的使用者：任何人」

---

#### ❌ 問題 2：表單看起來格式錯亂

**可能原因：**
- 瀏覽器不支援 CSS 樣式
- 檔案編碼問題

**解決方案：**
1. 確保 HTML 檔案編碼為 UTF-8
2. 嘗試使用不同的瀏覽器
3. 清除瀏覽器快取（Ctrl+Shift+Delete）

---

#### ❌ 問題 3：資料沒有寫入試算表

**可能原因：**
- Google App Script 沒有試算表的訪問權限
- 試算表 ID 設置錯誤
- 工作表名稱不匹配

**解決方案：**
1. 檢查 `GoogleAppScript.gs` 中的 `SPREADSHEET_ID`
2. 確認 `SHEET_NAME` 與試算表中的工作表名稱一致
3. 在 Apps Script 編輯器中查看執行日誌
   - 點擊「執行日誌」檢查錯誤訊息
4. 重新運行 `initializeSpreadsheet` 函數

---

#### ❌ 問題 4：授權失敗

**可能原因：**
- Google 帳號權限不足
- Apps Script 未正確關連到試算表

**解決方案：**
1. 使用有權限的 Google 帳號
2. 在 Apps Script 編輯器中點擊「專案設定」
3. 確認「GCP 專案編號」填寫正確
4. 重新進行授權

---

### 調試技巧

#### 查看執行日誌

1. 在 Apps Script 編輯器中點擊「執行日誌」標籤
2. 查看最近的執行記錄
3. 檢查是否有錯誤訊息

#### 手動測試 doPost 函數

```javascript
// 在 Apps Script 編輯器中添加此測試函數
function testDoPost() {
    const mockEvent = {
        postData: {
            contents: JSON.stringify({
                englishWord: 'test',
                chineseTranslation: '測試',
                etymology: 'test',
                exampleSentence: 'This is a test.',
                partOfSpeech: '名詞',
                timestamp: new Date().toLocaleString('zh-TW')
            })
        }
    };
    
    const result = doPost(mockEvent);
    Logger.log(result.getContent());
}
```

1. 選擇 `testDoPost` 函數
2. 點擊「執行」
3. 檢查日誌輸出

---

## 高級功能

### 功能 1：搜尋單字

使用 `searchWords()` 函數在 Apps Script 中搜尋已保存的單字：

```javascript
// 在 Apps Script 編輯器中執行
function testSearch() {
    const results = searchWords('persist');
    Logger.log(results);
}
```

### 功能 2：獲取所有單字

使用 `getAllWords()` 函數獲取所有已保存的單字：

```javascript
function testGetAllWords() {
    const allWords = getAllWords();
    Logger.log(allWords);
}
```

### 功能 3：刪除單字

使用 `deleteWord()` 函數刪除指定的單字資料：

```javascript
// 刪除第 1 行的資料（不包括標題）
function testDeleteWord() {
    const success = deleteWord(1);
    Logger.log(success ? '刪除成功' : '刪除失敗');
}
```

### 功能 4：自定義表單驗證

在 `word-form.html` 中添加自定義驗證邏輯：

```javascript
// 在表單提交前驗證
function validateWordData(data) {
    // 檢查英文單字長度
    if (data.englishWord.length > 50) {
        return false;
    }
    
    // 檢查是否為有效的英文單字
    const englishOnly = /^[a-zA-Z\-']+$/.test(data.englishWord);
    if (!englishOnly) {
        return false;
    }
    
    return true;
}
```

### 功能 5：批量匯入單字

在試算表中直接添加多個單字，然後在 Apps Script 中處理：

```javascript
function importBatchWords(data) {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    for (let i = 0; i < data.length; i++) {
        const row = [
            data[i].englishWord,
            data[i].chineseTranslation,
            data[i].etymology,
            data[i].exampleSentence,
            data[i].partOfSpeech,
            new Date().toLocaleString('zh-TW')
        ];
        sheet.appendRow(row);
    }
    
    return data.length + ' 個單字已匯入';
}
```

---

## 擴展應用

### 展示單字列表的前端頁面

你可以建立另一個 HTML 頁面來展示所有已保存的單字：

```html
<!DOCTYPE html>
<html>
<head>
    <title>單字列表</title>
</head>
<body>
    <h1>已保存的單字</h1>
    <table id="wordTable"></table>
    
    <script>
        const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APP_SCRIPT_URL';
        
        // 獲取所有單字
        async function loadWords() {
            // 需要在 Google App Script 中實現 doGet 函數
            const response = await fetch(GOOGLE_SCRIPT_URL);
            const words = await response.json();
            
            // 顯示在表格中
            // ... 程式碼省略 ...
        }
        
        loadWords();
    </script>
</body>
</html>
```

### API 端點擴展

在 `GoogleAppScript.gs` 中添加 `doGet` 函數以支援 GET 請求：

```javascript
function doGet(e) {
    try {
        const action = e.parameter.action;
        
        switch(action) {
            case 'getAllWords':
                return ContentService.createTextOutput(
                    JSON.stringify(getAllWords())
                ).setMimeType(ContentService.MimeType.JSON);
                
            case 'searchWords':
                const keyword = e.parameter.keyword;
                return ContentService.createTextOutput(
                    JSON.stringify(searchWords(keyword))
                ).setMimeType(ContentService.MimeType.JSON);
                
            default:
                return ContentService.createTextOutput(
                    JSON.stringify({error: '不支援的操作'})
                ).setMimeType(ContentService.MimeType.JSON);
        }
    } catch (error) {
        return ContentService.createTextOutput(
            JSON.stringify({error: error.toString()})
        ).setMimeType(ContentService.MimeType.JSON);
    }
}
```

---

## 安全建議

### 1. 保護敏感信息
- 不要將 Google App Script URL 暴露在公開的程式碼中
- 考慮使用環境變數存儲敏感信息

### 2. 限制訪問
- 定期檢查部署設置
- 如需額外安全，可在 Web App 中添加身份驗證

### 3. 定期備份
- 定期備份 Google 試算表
- 在「檔案」菜單中選擇「下載」進行備份

### 4. 錯誤日誌
- 定期查看 Apps Script 執行日誌
- 監控是否有異常訪問

---

## 總結清單

- [ ] 建立 Google 試算表
- [ ] 記錄試算表 ID
- [ ] 建立 Google Apps Script 專案
- [ ] 將 `GoogleAppScript.gs` 程式碼複製到編輯器
- [ ] 設置 `SPREADSHEET_ID`
- [ ] 運行 `initializeSpreadsheet` 函數
- [ ] 部署為 Web App
- [ ] 記錄部署的 URL
- [ ] 在 `word-form.html` 中設置 `GOOGLE_SCRIPT_URL`
- [ ] 測試表單提交
- [ ] ✅ 完成配置！

---

## 聯繫和支援

如遇到問題，請檢查：
1. 執行日誌中的錯誤訊息
2. 試算表 ID 和工作表名稱設置
3. Google App Script Web App 部署設置
4. 瀏覽器控制台是否有錯誤（按 F12）

---

**最後修改日期**：2026-06-09  
**版本**：1.0
