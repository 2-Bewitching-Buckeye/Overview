const mysql = require('mysql');
const db = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'product'
});

db.connect();

module.exports = db;