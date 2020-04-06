const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.log('Failed to connect to mysql: ', err);
  } else {
    console.log('Connected to the mysql!');
  }
});



