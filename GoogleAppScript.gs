// Google App Script - 處理來自表單的單字資料
// 將此程式碼複製到 Google Apps Script 編輯器

// 設定 - 配置試算表 ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // 替換為你的試算表ID
const SHEET_NAME = '單字資料'; // 試算表名稱

/**
 * 主要的 doPost 函數 - 接收來自表單的 POST 請求
 * @param {Object} e - 包含表單資料的事件物件
 * @return {ContentService.TextOutput} 回應結果
 */
function doPost(e) {
    try {
        // 解析接收到的 JSON 資料
        const postData = JSON.parse(e.postData.contents);
        
        // 驗證接收到的資料
        if (!postData.englishWord || !postData.chineseTranslation) {
            return ContentService.createTextOutput(
                JSON.stringify({
                    status: 'error',
                    message: '缺少必要的資料'
                })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        // 將資料寫入試算表
        const result = saveWordToSpreadsheet(postData);

        // 回傳成功訊息
        return ContentService.createTextOutput(
            JSON.stringify({
                status: 'success',
                message: '單字已成功保存',
                rowNumber: result
            })
        ).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log('錯誤: ' + error);
        return ContentService.createTextOutput(
            JSON.stringify({
                status: 'error',
                message: '處理請求時出現錯誤: ' + error.toString()
            })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * 將單字資料保存到 Google 試算表
 * @param {Object} data - 包含單字資訊的物件
 * @return {number} 新增資料所在的行號
 */
function saveWordToSpreadsheet(data) {
    try {
        // 獲取試算表和工作表
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = spreadsheet.getSheetByName(SHEET_NAME);

        // 如果工作表不存在，則創建它
        if (!sheet) {
            sheet = spreadsheet.insertSheet(SHEET_NAME);
            // 添加標題行
            sheet.appendRow([
                '英文單字',
                '中文翻譯',
                '字根分析',
                '例句',
                '詞性',
                '新增日期'
            ]);
            // 設定標題行的格式
            formatHeaderRow(sheet);
        }

        // 準備資料行
        const newRow = [
            data.englishWord,
            data.chineseTranslation,
            data.etymology,
            data.exampleSentence,
            data.partOfSpeech,
            data.timestamp || new Date().toLocaleString('zh-TW')
        ];

        // 附加新資料行到試算表
        sheet.appendRow(newRow);

        // 返回新增資料所在的行號
        const lastRow = sheet.getLastRow();
        return lastRow;

    } catch (error) {
        Logger.log('保存到試算表時出現錯誤: ' + error);
        throw error;
    }
}

/**
 * 格式化標題行
 * @param {Sheet} sheet - 工作表物件
 */
function formatHeaderRow(sheet) {
    const headerRange = sheet.getRange(1, 1, 1, 6);
    
    // 設定背景顏色
    headerRange.setBackground('#667eea');
    
    // 設定字體顏色為白色
    headerRange.setFontColor('#ffffff');
    
    // 設定字體粗體
    headerRange.setFontWeight('bold');
    
    // 設定字體大小
    headerRange.setFontSize(12);
    
    // 設定垂直對齊
    headerRange.setVerticalAlignment('middle');
    
    // 設定水平對齊
    headerRange.setHorizontalAlignment('center');
}

/**
 * 初始化試算表 - 首次設置時手動運行此函數
 * 1. 在 Google Apps Script 編輯器中點擊「執行」
 * 2. 授予必要的權限
 */
function initializeSpreadsheet() {
    try {
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = spreadsheet.getSheetByName(SHEET_NAME);

        // 如果工作表不存在，則創建它
        if (!sheet) {
            sheet = spreadsheet.insertSheet(SHEET_NAME);
            // 添加標題行
            sheet.appendRow([
                '英文單字',
                '中文翻譯',
                '字根分析',
                '例句',
                '詞性',
                '新增日期'
            ]);
            // 格式化標題行
            formatHeaderRow(sheet);
            Logger.log('試算表初始化成功！');
        } else {
            Logger.log('工作表已存在');
        }
    } catch (error) {
        Logger.log('初始化失敗: ' + error);
    }
}

/**
 * 獲取所有已保存的單字
 * @return {Array} 包含所有單字的陣列
 */
function getAllWords() {
    try {
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = spreadsheet.getSheetByName(SHEET_NAME);

        if (!sheet) {
            return [];
        }

        const data = sheet.getDataRange().getValues();
        const words = [];

        // 跳過標題行（第一行）
        for (let i = 1; i < data.length; i++) {
            words.push({
                englishWord: data[i][0],
                chineseTranslation: data[i][1],
                etymology: data[i][2],
                exampleSentence: data[i][3],
                partOfSpeech: data[i][4],
                timestamp: data[i][5]
            });
        }

        return words;
    } catch (error) {
        Logger.log('獲取單字時出現錯誤: ' + error);
        return [];
    }
}

/**
 * 搜尋單字
 * @param {string} keyword - 搜尋關鍵詞
 * @return {Array} 符合條件的單字陣列
 */
function searchWords(keyword) {
    try {
        const allWords = getAllWords();
        const results = allWords.filter(word => 
            word.englishWord.toLowerCase().includes(keyword.toLowerCase()) ||
            word.chineseTranslation.includes(keyword)
        );
        return results;
    } catch (error) {
        Logger.log('搜尋時出現錯誤: ' + error);
        return [];
    }
}

/**
 * 刪除指定行的單字資料
 * @param {number} rowNumber - 要刪除的行號（不包括標題行）
 * @return {boolean} 是否成功刪除
 */
function deleteWord(rowNumber) {
    try {
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = spreadsheet.getSheetByName(SHEET_NAME);

        if (!sheet) {
            return false;
        }

        // 實際行號 = 傳入的行號 + 1（因為有標題行）
        sheet.deleteRow(rowNumber + 1);
        return true;
    } catch (error) {
        Logger.log('刪除時出現錯誤: ' + error);
        return false;
    }
}
