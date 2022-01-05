const express = require("express")
const bodyParser = require("body-parser")
const mysqlConnection = require('./connection')
const app = express()
const persondir = require('./routes/person')

app.set("view engine","ejs")
app.use(bodyParser.json());
app.use("/person", persondir)

app.get('/',(req,res)=>{
    res.render("index")
})
    
app.listen(process.env.port || 3000,()=>{
    console.log("listening on 3000")
})