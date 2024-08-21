const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  waitForConnections: true,
  multipleStatements: true,
  host: dbConfig.HOST,
  port: '2083',
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;
