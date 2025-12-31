/* 
INSTRUCTIONS:
1. Copy this entire code.
2. Go to Google Apps Script.
3. Replace everything.
4. Click Deploy -> Manage deployments.
5. Click the 'Edit' (pencil) icon.
6. Select Version: 'New version' (CRITICAL STEP).
7. Click Deploy.
*/

function doGet(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var p = e.parameter || {};

        // Prepare data (with fallbacks so we always see something)
        var timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        var name = p.fullName || 'No Name';
        var phone = p.phone || 'No Phone';
        var resolution = p.resolution || 'No Resolution';

        // Append to sheet
        sheet.appendRow([timestamp, name, phone, resolution]);

        // Return success marker
        return ContentService.createTextOutput('CONNECTED_V2');
    } catch (err) {
        return ContentService.createTextOutput('Error: ' + err.toString());
    }
}

function doPost(e) {
    return doGet(e);
}
