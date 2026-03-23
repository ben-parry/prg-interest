// Google Apps Script — paste this into Extensions → Apps Script in your Google Sheet
// Then deploy as Web App (Execute as: Me, Access: Anyone)

const NOTIFY_EMAIL = 'ben@benparry.ca';
const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Append row
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.socials || '',
      data.referral || '',
      data.belief || ''
    ]);

    // Send notification email
    const subject = 'New PRG Interest: ' + (data.name || 'Unknown');
    const body = [
      'New application for PRG membership:\n',
      'Name: ' + (data.name || '—'),
      'Email: ' + (data.email || '—'),
      'Socials: ' + (data.socials || '—'),
      'Referral: ' + (data.referral || '—'),
      '',
      'Belief question:',
      data.belief || '—'
    ].join('\n');

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
