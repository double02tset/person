const mysql = require('mysql')

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test1",
    multipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('connected')
    }else{
        console.log('failed')
    }
})
module.exports = mysqlConnection;