'use strict';

const http = require('http');
const { Client } = require('pg');

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect();

  console.log(DATABASE_URL);
  client.query('SELECT NOW();', (err,res) => {
    console.log("trace1");
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
  client.end();
});

server.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on ${PORT}/`);
});

