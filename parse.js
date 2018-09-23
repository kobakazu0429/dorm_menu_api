require('pdfjs-dist/lib/examples/node/domstubs');
require('./libs/pdf-table-extractor');

const fs = require('fs');

const PDFJS = require('pdfjs-dist');
PDFJS.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
PDFJS.cMapUrl = 'node_modules/pdfjs-dist/cmaps';
PDFJS.cMapPacked = true;
PDFJS.disableFontFace = true;

const returnJSON = async pdfFilePath => {
  const pdfFile = new Uint8Array(fs.readFileSync(pdfFilePath));

  const pdfRead = await PDFJS.getDocument({
    data: pdfFile,
    nativeImageDecoderSupport: 'none',
    disableNativeImageDecoder: true,
    disableFontFace: true
  });

  const pdfParsed = await pdf_table_extractor(pdfRead, PDFJS);

  let all_tables = {};

  while ((page_tables = pdfParsed.pageTables.shift())) {
    all_tables[`page_${page_tables.page}`] = page_tables.tables;
  }

  let all_hash = {};

  for (table in all_tables) {
    const cleaned = cleaning_data(all_tables[table]);
    const parsed = parse_data(cleaned);
    const DB = toHash(parsed);
    Object.assign(all_hash, DB);
  }

  return all_hash;
};

const cleaning_data = data => {
  const pattern1 = new RegExp(/^(Ａ|Ｂ)定食\d+./, 'g');
  const pattern2 = new RegExp(/栄養価エネルギー/, 'g');
  const pattern3 = new RegExp(/\d{3,4}./, 'g');

  const map = {
    0: 'date',
    1: 'week',
    2: 'morning',
    3: 'lunch',
    4: 'dinnerA',
    5: 'dinnerB',
    6: 'dinnerAB'
  };
  const tmp = {};
  let j = 0;

  for (let i = 0; i < data.length; i++) {
    const _index = data[i][0] + data[i][1];

    if (!pattern1.test(_index)) {
      if (!pattern2.test(_index)) {
        if (!pattern3.test(_index)) {
          if (_index) {
            if (j > 6) throw new Error('This is Unexpected Data Type.');

            tmp[map[j]] = data[i];
            j++;
          }
        }
      }
    }
  }
  return tmp;
};

const parse_data = data => {
  for (key in data) {
    data[key] = data[key].map(v => {
      return v
        .replace(/^日$/g, '')
        .replace(/(朝\n食)/g, '')
        .replace(/(昼\n食)/g, '')
        .replace(/(夕\n食)/g, '')
        .replace(/Ａ/g, '')
        .replace(/Ｂ/g, '')
        .replace(/(\(|\（)/g, '')
        .replace(/(\)|\）)/g, '')
        .replace(/曜日/g, '')
        .replace(/ご飯/g, '')
        .replace(/汁物/g, '')
        .replace(/漬物/g, '')
        .replace(/牛乳/g, '')
        .replace(/パン/g, '')
        .replace(/ジャム/g, '')
        .replace(/サラダ/g, '')
        .replace(/デザート/g, '')
        .replace(/ふりかけ/g, '')
        .replace(/マーガリン/g, '')
        .replace(/共通メニュー/g, '')
        .replace(/・/g, '')
        .replace(/(\n)+/g, '\n')
        .replace(/(\n)+$/g, '')
        .replace(/^(\n)+/g, '');
    });
    data[key] = data[key].filter(v => v);
  }
  return data;
};

const toHash = data => {
  const tmp1 = {};
  for (let i = 0; i < 7; i++) {
    const tmp2 = {};

    tmp2.week = data['week'][i];
    tmp2.morning = data['morning'][i];
    tmp2.lunch = data['lunch'][i];
    tmp2.dinnerA = data['dinnerA'][i];
    tmp2.dinnerB = data['dinnerB'][i];
    tmp2.dinnerAB = data['dinnerAB'][i];
    tmp1[data.date[i]] = tmp2;
  }
  return tmp1;
};

module.exports = returnJSON;
