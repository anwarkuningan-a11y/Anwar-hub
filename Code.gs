const SHEET_ID = '1T1YCVGE68hKDdMA_BX64qCm2tfrhNfaCaLjdJ3Onp9A';

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'getAll') {
    return jsonOutput(getAllData());
  }

  return jsonOutput({
    status: 'ok',
    message: 'Anwar Hub API Active'
  });
}

function jsonOutput(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAllData() {
  const ss = SpreadsheetApp.openById(SHEET_ID);

  return {
    links: getSheetData(ss, 'Links')
  };
}

function getSheetData(ss, name) {
  const sheet = ss.getSheetByName(name);

  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();

  if (values.length < 2) return [];

  const headers = values[0];

  return values.slice(1).map(row => {
    let obj = {};

    headers.forEach((h, i) => {
      obj[h] = row[i];
    });

    return obj;
  });
}
