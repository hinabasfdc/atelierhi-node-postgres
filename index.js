'use strict';

const http = require('http');
const { Client } = require('pg');

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const TABLE_NAME = process.env.TABLE_NAME;

const server = http.createServer((req, httpRes) => {
  httpRes.statusCode = 200;
  httpRes.setHeader('Content-Type', 'text/html');

  //DB接続を生成
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: true,
  });
  client.connect();

  //クエリー文字列にテーブル名を追加
  let q = "SELECT * FROM " + TABLE_NAME + " LIMIT 100";
  client.query(q, (err, pgRes) => {
    if (err) {
      //エラーを画面に表示
      let o = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"></head><body><p>';
      o += err.stack;
      o += "</p></body></html>";
      httpRes.end(o);
    } else {
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

      //画面表示
      httpRes.end(o);
    }
    //DB接続をクローズ
    client.end();
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});