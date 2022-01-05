const express = require('express')
const Router = express.Router();
const multer = require('multer')
const path = require('path')
const mysqlConnection = require("../connection")

let per_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
let person_image;

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'images')
    },
    filename: (req,file,cb)=>{
        person_image = Date.now()+path.extname(file.originalname)
        cb(null,person_image)
    }
})
const upload = multer({storage: storage})

Router.get("/",(req,res)=>{
    mysqlConnection.query("SELECT * FROM person",(err,result)=>{
        if(!err){
            res.send(result)
        }
    })
})
Router.get("/:id",(req,res)=>{
    mysqlConnection.query("SELECT * FROM person WHERE per_id =?",[req.params.id],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{res.send(result)}
    })
})

Router.post("/",upload.single('image'),(req,res)=>{
    if(req.body.per_id && req.body.per_firstname && req.body.per_lastname && person_image){
        let sqlq ="INSERT INTO person (per_id, per_firstname, per_lastname, per_image, submission_date) VALUES ?";
        let values =[[req.body.per_id, req.body.per_firstname, req.body.per_lastname, person_image, per_date]];
        mysqlConnection.query(sqlq,[values],(err,result)=>{
            if(err){
                return res.send(err.sqlMessage)
            }else{res.send("done")}
        })
    }else(res.send("please provid necessary information"))
})
Router.put("/",(req,res)=>{
    if(req.body.per_id && req.body.per_firstname && req.body.per_lastname){
        let new_per_firstname = req.body.per_firstname;
        let new_per_lastname = req.body.per_lastname;
        let sqlq = "UPDATE person SET per_firstname =?,per_lastname =?, submission_date=? WHERE per_id =?";
        mysqlConnection.query(sqlq,[new_per_firstname,new_per_lastname,per_date,req.body.per_id],(err,result)=>{
            if(err){
                res.send(err.message)
            }else{res.send("updated")}
        })
    }else(res.send('provid all information'))
    
})

Router.delete("/:id",(req,res)=>{
    mysqlConnection.query("DELETE FROM person WHERE per_id =?",[req.params.id],(err,result)=>{
        if(err){
            res.send(err.message)
        }else{res.send("deleted success")}
    })
})

module.exports = Router;