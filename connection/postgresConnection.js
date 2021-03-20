const { Client, Pool } = require('pg');

const pool = new Pool();

pool.query('SELECT * FROM test')
  .then(result => console.log(result.rows))
  .catch(err => console.log(err))