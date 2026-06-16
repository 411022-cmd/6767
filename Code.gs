// Google App Script - Code.gs
// 將此代碼複製到 Google Apps Script 編輯器

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = '計算資料';

/**
 * 接收前端 POST 請求
 */
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);

        // 驗證資料
        if (!data.number1 && data.number1 !== 0 || !data.number2 && data.number2 !== 0 || !data.answer && data.answer !== 0) {
            return ContentService.createTextOutput(
                JSON.stringify({
                    status: 'error',
                    message: '缺少必要資料'
                })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        // 保存到試算表
        saveToSpreadsheet(data);

        return ContentService.createTextOutput(
            JSON.stringify({
                status: 'success',
                message: '資料已保存'
            })
        ).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        Logger.log('錯誤: ' + error);
        return ContentService.createTextOutput(
            JSON.stringify({
                status: 'error',
                message: '處理失敗: ' + error.toString()
            })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * 保存資料到 Google 試算表
 */
function saveToSpreadsheet(data) {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // 如果工作表不存在，建立新工作表
    if (!sheet) {
        sheet = spreadsheet.insertSheet(SHEET_NAME);
        sheet.appendRow(['第一個數字', '第二個數字', '相加答案', '新增時間']);
    }

    // 添加資料行
    sheet.appendRow([
        data.number1,
        data.number2,
        data.answer,
        data.timestamp
    ]);
}

/**
 * 初始化試算表（第一次使用時手動執行）
 */
function initializeSpreadsheet() {
    try {
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = spreadsheet.getSheetByName(SHEET_NAME);

        if (!sheet) {
            sheet = spreadsheet.insertSheet(SHEET_NAME);
            sheet.appendRow(['第一個數字', '第二個數字', '相加答案', '新增時間']);
            Logger.log('初始化成功！');
        } else {
            Logger.log('工作表已存在');
        }
    } catch (error) {
        Logger.log('初始化失敗: ' + error);
    }
}
