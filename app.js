const express = require("express")
const bodyParser = require("body-parser")
const mysqlConnection = require('./connection')
const app = express()
const bookdir = require('./routes/book')

app.set("view engine","ejs")
app.use(bodyParser.json());
app.use("/book", bookdir)

app.get('/',(req,res)=>{
    res.render("index")
})
    
app.listen(process.env.port || 3000,()=>{
    console.log("listening on 3000")
})