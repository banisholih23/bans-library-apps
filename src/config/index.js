const { database } = require('./mysql')
const mysql = require('mysql')

//setting database mysql
const connection = mysql.createConnection(database);

connection.connect(function (error) {
    if (error) throw error
    console.log("Database has connected...");

})

module.exports = connection