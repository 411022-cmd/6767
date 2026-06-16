# 純前端計算機軟體 - 完整配置指南

## 📋 項目說明

這是一個簡單的純前端計算機軟體，包含：
- **計算器頁面** (`index.html`) - 用戶輸入兩個數字進行相加
- **管理頁面** (`admin.html`) - 管理者儲存計算資料到 Google 試算表
- **後端服務** (`Code.gs`) - Google App Script 接收資料並寫入試算表

### 技術棧
- **前端**：原生 HTML、CSS、JavaScript（無框架、無套件）
- **後端**：Google App Script（無 API KEY、無 GCP 設定）
- **資料儲存**：Google 試算表

---

## 🏗️ 系統架構

```
┌──────────────────────┐
│   計算器頁面         │
│ index.html           │
│  - 輸入兩個數字      │
│  - 顯示相加結果      │
└──────────────────────┘
           │
           └─── 管理頁面鏈接

┌──────────────────────┐
│   管理頁面           │
│ admin.html           │
│  - 管理員填寫資料    │
│  - 發送 POST 到 GAS  │
└──────────┬───────────┘
           │
           │ POST 請求
           │ (JSON 資料)
           ▼
┌──────────────────────┐
│  Google App Script   │
│   Code.gs            │
│  - 接收 POST 請求    │
│  - 驗證資料          │
│  - 寫入試算表        │
└──────────┬───────────┘
           │
           │ 寫入
           ▼
┌──────────────────────┐
│  Google 試算表       │
│  - 儲存計算資料      │
└──────────────────────┘
```

---

## 📁 文件說明

### 1. index.html - 計算器頁面

**功能**：
- 輸入框輸入兩個數字
- 按「計算」按鈕相加
- 直式顯示計算結果
- 「清除」按鈕重置表單
- 按 Enter 鍵快速計算
- 管理頁面連結

**程式碼特點**：
- 使用 `parseFloat()` 解析數字輸入
- 簡單的 CSS 樣式，無外部依賴
- JavaScript 事件監聽（點擊、按鍵）

### 2. admin.html - 管理頁面

**功能**：
- 輸入第一個數字
- 輸入第二個數字
- 輸入相加答案
- 驗證答案是否正確
- 點擊「儲存資料」送到 Google App Script
- 返回計算器頁面的連結

**驗證邏輯**：
- 檢查答案是否等於 num1 + num2
- 如果不對，顯示錯誤提示

**資料格式**（發送到後端）：
```json
{
    "number1": 10,
    "number2": 20,
    "answer": 30,
    "timestamp": "2026-06-16 10:30:45"
}
```

### 3. Code.gs - Google App Script 後端

**函數說明**：

#### doPost(e)
- 接收前端 POST 請求
- 解析 JSON 資料
- 驗證必要欄位
- 調用 `saveToSpreadsheet()` 儲存資料
- 返回成功/錯誤響應

#### saveToSpreadsheet(data)
- 打開指定的 Google 試算表
- 檢查工作表是否存在
- 如果不存在則建立新工作表和標題行
- 添加資料行到試算表

#### initializeSpreadsheet()
- 初始化試算表
- 建立工作表（如果不存在）
- 添加標題行
- 手動運行一次即可

---

## 🚀 完整設置步驟

### 步驟 1：建立 Google 試算表（2 分鐘）

1. 打開 https://sheets.google.com
2. 點擊「建立新試算表」
3. 命名為 `計算機資料` 或任何名字
4. **複製試算表 ID**（位於 URL 中）
   ```
   URL: https://docs.google.com/spreadsheets/d/[試算表ID]/edit
                                              └─ 複製這個部分
   ```
5. 記錄這個 ID，下一步會用到

### 步驟 2：建立 Google Apps Script 專案（3 分鐘）

1. 打開建立的試算表
2. 點擊「延伸程式集」→ 「Apps Script」
3. 會開啟一個新的編輯器分頁
4. 刪除預設的 `function myFunction(){}` 程式碼
5. 將 [Code.gs](./Code.gs) 中的所有程式碼複製到編輯器

### 步驟 3：配置試算表 ID（1 分鐘）

在 Code.gs 編輯器中找到這一行（第 4 行）：
```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
```

替換為你的試算表 ID：
```javascript
const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';
```

### 步驟 4：初始化試算表（2 分鐘）

1. 在 Code.gs 編輯器的函數下拉菜單中選擇 `initializeSpreadsheet`
2. 點擊「▶️ 執行」按鈕
3. 首次運行會要求授權：
   - 點擊「檢閱權限」
   - 選擇你的 Google 帳號
   - 點擊「允許」
4. 等待執行完成
5. 查看執行日誌應該看到「初始化成功！」訊息

**結果**：試算表會自動建立工作表 `計算資料` 和標題行

### 步驟 5：部署為 Web App（2 分鐘）

1. 在 Code.gs 編輯器中點擊「部署」→ 「新增部署」
2. 點擊右上方的齒輪圖標，選擇「Web 應用程式」
3. 設定如下：
   - **執行身份**：選擇你的 Google 帳號
   - **具有以下存取權的使用者**：選擇「任何人」
4. 點擊「部署」
5. 複製顯示的部署 URL：
   ```
   https://script.google.com/macros/d/[SCRIPT_ID]/userweb
   ```

**重要**：保存這個 URL，下一步會用到

### 步驟 6：設置管理頁面 URL（1 分鐘）

打開 `admin.html` 檔案，找到這一行（大約第 120 行）：
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APP_SCRIPT_URL_HERE';
```

替換為你的 Google App Script Web App URL：
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb';
```

### 步驟 7：測試系統（2 分鐘）

#### 測試計算器
1. 在瀏覽器中打開 `index.html`
2. 輸入兩個數字，例如 10 和 20
3. 點擊「計算」
4. 應該看到答案 30

#### 測試管理頁面
1. 點擊「管理頁面」連結
2. 輸入以下資料：
   - 第一個數字：`5`
   - 第二個數字：`3`
   - 相加答案：`8`
3. 點擊「💾 儲存資料」
4. 看到「✅ 成功：資料已儲存到試算表」訊息
5. 打開 Google 試算表確認資料已寫入

---

## 📊 Google 試算表結構

建立後的試算表會包含以下列：

| A 列 | B 列 | C 列 | D 列 |
|------|------|------|------|
| **第一個數字** | **第二個數字** | **相加答案** | **新增時間** |
| 10 | 20 | 30 | 2026-06-16 10:30:45 |
| 5 | 3 | 8 | 2026-06-16 10:35:22 |
| ... | ... | ... | ... |

---

## 🔄 工作流程說明

### 計算器流程
```
1. 用戶打開 index.html
2. 輸入第一個數字
3. 輸入第二個數字
4. 點擊「計算」或按 Enter
5. JavaScript 計算 num1 + num2
6. 結果顯示在「答案」區域
```

### 管理頁面流程
```
1. 管理員點擊「管理頁面」連結
2. 打開 admin.html
3. 輸入三個數字（num1、num2、answer）
4. 點擊「儲存資料」
5. 前端驗證 num1 + num2 === answer
6. 驗證通過則發送 POST 請求到 Google App Script
7. Google App Script 接收並寫入試算表
8. 顯示成功訊息
9. 表單重置
```

### 資料儲存流程
```
admin.html (前端)
  ↓ (JSON 資料)
Google App Script doPost()
  ├─ 解析 JSON
  ├─ 驗證資料
  ├─ 打開試算表
  ├─ 檢查工作表
  ├─ 寫入資料行
  └─ 返回成功訊息
  ↓
Google 試算表（永久儲存）
```

---

## 🛠️ 代碼說明

### index.html 核心代碼

```javascript
// 計算函數
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value) || 0;
    const num2 = parseFloat(document.getElementById('num2').value) || 0;
    const result = num1 + num2;
    document.getElementById('result').textContent = result;
}

// 清除表單
function clearForm() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').textContent = '0';
}
```

### admin.html 核心代碼

```javascript
// 表單提交
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 驗證答案是否正確
    if (parseFloat(num1) + parseFloat(num2) !== parseFloat(answer)) {
        showMessage('❌ 錯誤：答案計算不正確', 'error');
        return;
    }

    // 準備資料
    const data = {
        number1: parseFloat(num1),
        number2: parseFloat(num2),
        answer: parseFloat(answer),
        timestamp: new Date().toLocaleString('zh-TW')
    };

    // 發送到 Google App Script
    await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
    });
});
```

### Code.gs 核心代碼

```javascript
// 接收 POST 請求
function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    saveToSpreadsheet(data);
    return ContentService.createTextOutput(
        JSON.stringify({ status: 'success' })
    ).setMimeType(ContentService.MimeType.JSON);
}

// 儲存到試算表
function saveToSpreadsheet(data) {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID)
        .getSheetByName(SHEET_NAME);
    sheet.appendRow([
        data.number1,
        data.number2,
        data.answer,
        data.timestamp
    ]);
}
```

---

## ❓ 常見問題

### Q1：如何改變頁面的顏色？
A：編輯 HTML 檔案中的 CSS 部分，找到 `background` 或 `color` 屬性並修改。
例如：
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Q2：如何添加更多計算欄位？
A：在 `index.html` 中複製輸入區塊，並在 JavaScript 中添加新的計算邏輯。

### Q3：如何修改工作表名稱？
A：
1. 在 `Code.gs` 中修改：`const SHEET_NAME = '新名稱';`
2. 在 `admin.html` 中的訊息可能也要修改（可選）

### Q4：資料會被刪除嗎？
A：不會。資料保存在 Google 試算表中，永久保存。

### Q5：如何查看試算表中的所有資料？
A：打開 Google 試算表，資料會自動顯示在 `計算資料` 工作表中。

### Q6：如何重新部署？
A：在 Code.gs 編輯器中點擊「部署」→「新增部署」，操作同第 5 步。

---

## 🐛 故障排除

### 問題 1：提交管理頁面後看到「無法連接到伺服器」

**原因**：Google App Script URL 未正確設置或未部署

**解決方案**：
1. 檢查 `admin.html` 中的 `GOOGLE_SCRIPT_URL` 變數
2. 確認 URL 完整且正確
3. 檢查 Google App Script 已部署為 Web App
4. 確保部署設置為「任何人都能訪問」

### 問題 2：答案計算不正確時出現錯誤訊息

**原因**：管理者輸入的答案與計算結果不符

**解決方案**：
1. 重新檢查輸入的三個數字
2. 確保 num1 + num2 = answer
3. 按正確的答案重新提交

### 問題 3：Google App Script 執行失敗

**原因**：SPREADSHEET_ID 錯誤或授權問題

**解決方案**：
1. 檢查 `SPREADSHEET_ID` 是否正確
2. 重新運行 `initializeSpreadsheet()` 函數
3. 檢查執行日誌看錯誤訊息

### 問題 4：試算表中沒有看到資料

**原因**：工作表名稱不匹配

**解決方案**：
1. 打開 Google 試算表
2. 檢查工作表名稱是否為「計算資料」
3. 在 `Code.gs` 中確認 `SHEET_NAME` 與試算表一致

---

## 📝 總結清單

設置完成檢查清單：

- [ ] 建立 Google 試算表
- [ ] 複製試算表 ID
- [ ] 打開試算表並啟動 Apps Script
- [ ] 複製 Code.gs 程式碼
- [ ] 設置 SPREADSHEET_ID
- [ ] 運行 initializeSpreadsheet() 函數
- [ ] 授權 Google 帳號
- [ ] 部署為 Web App
- [ ] 複製部署 URL
- [ ] 在 admin.html 中設置 GOOGLE_SCRIPT_URL
- [ ] 測試計算器功能
- [ ] 測試管理頁面提交
- [ ] 確認試算表中有資料
- [ ] ✅ 完成！

---

## 📚 文件版本

| 檔案 | 版本 | 說明 |
|------|------|------|
| index.html | 1.0 | 計算器頁面 |
| admin.html | 1.0 | 管理頁面 |
| Code.gs | 1.0 | Google App Script 後端 |

---

## 🎯 後續擴展方向

1. **資料展示頁面**：新增頁面展示所有已儲存的計算記錄
2. **刪除功能**：添加刪除某條記錄的功能
3. **修改功能**：允許修改已儲存的計算記錄
4. **統計功能**：顯示計算記錄的統計信息
5. **搜尋功能**：按日期或值搜尋記錄
6. **匯出功能**：將資料匯出為 CSV 或 Excel

---

## 📄 許可證

此項目可自由使用和修改

---

**祝你使用愉快！** 💡
