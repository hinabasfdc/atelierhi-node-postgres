'use strict';

const http = require('http');
const { Client } = require('pg');

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL + "?ssl=true"; //SSLで通信するためのオプションを追加
const TABLE_NAME = process.env.TABLE_NAME;

const server = http.createServer((req, httpRes) => {
  httpRes.statusCode = 200;
  httpRes.setHeader('Content-Type', 'text/html');

  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect();

  let q = "SELECT * FROM " + TABLE_NAME;
  client.query(q, (err, pgRes) => {
    let o = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"></head><body><table>';

    //ヘッダー行を作成
    o += "<tr>";
    pgRes.fields.forEach(element => {
      o += "<th>" + element.name + "</th>";
    });
    o += "</tr>";

    //各行を作成
    pgRes.rows.forEach(element => {
      o += "<tr>";
      for (let k in element) {
        o += "<td>" + element[k] + "</td>";
      };
      o += "</tr>";
    });
    o += "</table></body></html>";

    httpRes.end(o);
    client.end();
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});