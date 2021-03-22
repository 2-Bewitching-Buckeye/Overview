const { Client, Pool } = require('pg');

const pool = new Pool({
  user: 'kevinliu',
  host: 'localhost',
  database: 'product',
  port: 5432
});

pool.connect();

module.exports = pool;