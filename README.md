# 📚 單字管理系統 & 🧮 計算機軟體

包含兩個獨立的項目：

1. **📚 單字管理系統** - 管理者透過表單新增英文單字到 Google 試算表
2. **🧮 計算機軟體** - 前端計算機 + 管理後台，資料存儲到 Google 試算表

---

## 📚 單字管理系統

## ✨ 功能特色

- ✅ **簡潔的網頁表單** - 美觀的 UI 設計，易於使用
- ✅ **Google Apps Script 後端** - 無需託管伺服器
- ✅ **Google 試算表儲存** - 資料安全可靠
- ✅ **即時保存** - 表單提交後立即保存到試算表
- ✅ **錯誤提示** - 友善的用戶提示訊息
- ✅ **格式化試算表** - 自動建立和格式化工作表

## 📁 文件結構

```
├── README.md                      # 項目概述（本文件）
├── QUICK_START.md                 # 5分鐘快速開始指南
├── SETUP_GUIDE.md                 # 詳細配置指南
├── word-form.html                 # 前端表單頁面
└── GoogleAppScript.gs             # 後端程式碼
```

## 🚀 快速開始

### 最快的方式（5 分鐘）
請參考 [QUICK_START.md](./QUICK_START.md)

### 詳細步驟（完整配置）
請參考 [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## 📋 表單欄位說明

| 欄位 | 類型 | 說明 | 範例 |
|------|------|------|------|
| **英文單字** | 文字 | 要新增的英文詞彙 | `perseverance` |
| **中文翻譯** | 文字 | 對應的中文翻譯 | `堅持不懈` |
| **字根分析** | 長文字 | 詞根、詞綴組成說明 | `persist(堅持) + ance(名詞後綴)` |
| **例句** | 長文字 | 使用該單字的例句 | `Her perseverance impressed everyone.` |
| **詞性** | 下拉菜單 | 名詞、動詞、形容詞等 | `名詞 (Noun)` |

## 🏗️ 系統架構

```
用戶填寫表單
    ↓
前端驗證資料
    ↓
發送 POST 請求
    ↓
Google App Script 接收
    ↓
檢查/建立工作表
    ↓
寫入試算表
    ↓
返回成功訊息
    ↓
表單重置
```

## 📝 工作流程

### 管理者步驟
1. 打開 `word-form.html`
2. 填寫表單欄位
3. 點擊「💾 儲存單字」按鈕
4. 看到成功訊息，單字已保存

### 系統處理步驟
1. HTML 表單驗證所有必填欄位
2. 發送 JSON 資料到 Google App Script
3. Google App Script 接收並驗證資料
4. 檢查試算表中是否存在工作表
5. 如果不存在則建立新工作表和標題行
6. 添加新資料行到試算表
7. 返回成功響應
8. 前端顯示成功訊息並重置表單

## 🔧 配置要求

### 必需
- [ ] Google 帳號
- [ ] Google 試算表
- [ ] Google Apps Script
- [ ] 瀏覽器

### 需要獲取
- [ ] Google 試算表 ID
- [ ] Google App Script 部署 URL

## 📚 詳細文檔

### 文件 1：[QUICK_START.md](./QUICK_START.md)
- 5分鐘快速開始指南
- 基本配置步驟
- 快速測試方法

### 文件 2：[SETUP_GUIDE.md](./SETUP_GUIDE.md)
- 完整的分步驟指南
- Google App Script 詳細設置
- 前端表單配置
- 工作流程說明
- 故障排除指南
- 高級功能介紹
- 安全建議

### 文件 3：[word-form.html](./word-form.html)
- 前端使用者界面
- 表單驗證邏輯
- 樣式和響應式設計
- JavaScript 事件處理

### 文件 4：[GoogleAppScript.gs](./GoogleAppScript.gs)
- 後端處理邏輯
- `doPost()` - 接收表單資料
- `saveWordToSpreadsheet()` - 保存到試算表
- `getAllWords()` - 獲取所有單字
- `searchWords()` - 搜尋單字
- `deleteWord()` - 刪除單字
- `initializeSpreadsheet()` - 初始化試算表

## 🛠️ 高級功能

### 已實現
- ✅ 表單提交和驗證
- ✅ 資料保存到試算表
- ✅ 自動工作表建立和格式化
- ✅ 錯誤處理和日誌記錄

### 可擴展
- 🔍 搜尋功能（通過 `searchWords` 函數）
- 📊 資料匯出功能
- 🔐 用戶身份驗證
- 📱 移動應用版本
- 🌐 多語言支援
- 📈 統計分析功能

## ❓ 常見問題

### Q：如何改變表單的外觀？
A：編輯 `word-form.html` 中的 CSS 部分（`<style>` 標籤內）

### Q：如何添加更多欄位？
A：
1. 在 `word-form.html` 中添加新的 `<input>` 或 `<textarea>`
2. 在 JavaScript 中收集新欄位的值
3. 在 `GoogleAppScript.gs` 中的 `saveWordToSpreadsheet` 函數中處理新欄位
4. 在試算表的標題行中添加新列

### Q：如何修改詞性選項？
A：編輯 `word-form.html` 中的 `<select>` 元素內的 `<option>` 選項

### Q：資料會被刪除嗎？
A：不會。資料保存在 Google 試算表中，只要試算表存在，資料就不會丟失

### Q：可以限制誰能提交資料嗎？
A：可以。在 Apps Script 中添加驗證邏輯或使用身份驗證

## 🐛 故障排除

如遇到問題，請參考 [SETUP_GUIDE.md](./SETUP_GUIDE.md) 中的「故障排除」部分

常見問題：
- ❌ 「無法連接到伺服器」 - 檢查 Google App Script URL
- ❌ 「資料未保存」 - 檢查試算表 ID 和工作表名稱
- ❌ 「授權失敗」 - 重新進行 Google 帳號授權

## 📞 支援

1. 查看 [SETUP_GUIDE.md](./SETUP_GUIDE.md) 的「故障排除」部分
2. 檢查 Google Apps Script 的「執行日誌」
3. 檢查瀏覽器的開發者工具（F12）中的錯誤訊息

## 📄 許可證

此項目可自由使用和修改

## 🎯 版本歷史

### v1.0 (2026-06-09)
- ✨ 初始版本發佈
- ✅ 完整的表單功能
- ✅ Google App Script 後端
- ✅ 詳細文檔

---

## 📖 下一步

1. **快速開始**：閱讀 [QUICK_START.md](./QUICK_START.md)
2. **詳細配置**：按照 [SETUP_GUIDE.md](./SETUP_GUIDE.md) 進行設置
3. **測試系統**：新增測試單字
4. **開始使用**：開始新增真實單字資料

---

## 🧮 計算機軟體

一個簡單的純前端計算機軟體，包含計算器頁面和管理後台。

### 特點
- ✅ **原生 HTML/CSS/JS** - 無框架、無套件
- ✅ **兩個頁面** - 計算器頁面 + 管理頁面
- ✅ **Google App Script 後端** - 簡單的 doPost() 函數
- ✅ **Google 試算表儲存** - 資料永久保存
- ✅ **資料驗證** - 檢查答案是否正確

### 文件結構（計算機部分）
```
├── index.html                 # 計算器頁面
├── admin.html                 # 管理頁面
├── Code.gs                    # Google App Script 後端
└── CALCULATOR_SETUP.md        # 詳細配置指南
```

### 快速開始
1. 參考 [CALCULATOR_SETUP.md](./CALCULATOR_SETUP.md) 進行配置
2. 打開 `index.html` 進行計算
3. 點擊「管理頁面」可儲存計算資料

### 頁面說明

#### 計算器頁面 (index.html)
- 輸入兩個數字
- 按「計算」進行相加
- 直式顯示結果
- 有「清除」按鈕重置表單

#### 管理頁面 (admin.html)
- 管理員輸入計算資料
- 自動驗證答案是否正確
- 點擊「儲存資料」上傳到 Google 試算表
- 顯示成功/錯誤訊息

#### 後端 (Code.gs)
- `doPost(e)` - 接收前端 POST 請求
- `saveToSpreadsheet(data)` - 保存資料到試算表
- `initializeSpreadsheet()` - 初始化試算表

---

## 📖 完整文檔

### 單字管理系統文檔
- [QUICK_START.md](./QUICK_START.md) - 5分鐘快速開始
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - 詳細配置指南

### 計算機軟體文檔
- [CALCULATOR_SETUP.md](./CALCULATOR_SETUP.md) - 計算機完整配置指南

---

## 📁 所有文件清單

### 單字管理系統相關
- `word-form.html` - 單字管理表單
- `GoogleAppScript.gs` - Google App Script 後端（單字）
- `QUICK_START.md` - 快速開始指南
- `SETUP_GUIDE.md` - 詳細配置指南

### 計算機軟體相關
- `index.html` - 計算器頁面
- `admin.html` - 管理頁面
- `Code.gs` - Google App Script 後端（計算機）
- `CALCULATOR_SETUP.md` - 計算機配置指南

---

**祝你使用愉快！** 💡