# atelierhi-node-postgres

## 概要
- PostgreSQL にアクセスし、設定変数で指定したテーブルの内容を一覧表示する Node.js プログラム
- Heroku 上で動かすことを想定

## デプロイ
- Heroku ボタンを使ってください。
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## サンプルDBテーブルの作成
### サンプルデータ
- [products.csv](https://github.com/hinabasfdc/atelierhi-node-postgres/blob/master/products.csv)
### テーブル作成 SQL コマンド
```
create table products (
   productid varchar(18) primary key,
   name varchar(255),
   description varchar(255),
   price integer
);
```
### データロード PSQL コマンド
```
\copy products (productid,name,description,price) from 'products.csv' with csv
```