const mysql = require('mysql2');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'rollins/5920',
    database:'rolltech'
})
connection.connect((err)=>{
    if(err) throw err
    console.log("Database Connected succesfully,stay with me")
})
module.exports = connection;