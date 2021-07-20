const express = require('express');
const path = require("path");
const morgan = require("morgan");
const fs = require('fs')
require('dotenv/config');
const app = express();
const cors = require('cors');
const { Pool, Client } = require('pg');
const client = new Client();
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10)

var multer  = require('multer')





const { createInflate } = require('zlib');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      
            cb(null, './uploads/');
      },
      filename: function(req, file, cb) {
        bcrypt.genSalt(2).then(name => {
            
            cb(null, req.body.user + name.replace('/', '-')+ path.extname(file.originalname));
        })
        
      }
});
const upload = multer({storage: storage,});
const uploadDocs = multer({dest: 'uploads/'});
app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static('uploads'));


function openConnection(){
    
    return new Pool({
        user: process.env.user,
        host: process.env.host,
        password: process.env.password,
        database: process.env.database,
    });
}

app.get("/",(req,res) =>{
    res.send("hello salvus");
});

app.get("/getProf", (req,res) => {
    var pool = openConnection();
    pool.query("SELECT prof_name FROM profission" , (err, result) => {
        res.send(result.rows)
        pool.end();
    });
});

app.get("/getProfSpec", (req,res) => {
    var pool = openConnection();
    pool.query("SELECT prof_id, prof_name, s.specid, s.spec_name from profission INNER JOIN speciality s ON s.prof_id_fk = prof_id" , (err, result) => {
        res.send(result.rows)
        pool.end();
    });
});

app.post("/createUser",upload.fields([{name: "avatar", maxCount : 1}, {name: "docs"}]),(req,res) => {
    
    var data = (req.body);
    var pool = openConnection();
  

    let profQuery = "INSERT INTO professional_info (prof_id_fk, prof_reg_number, prof_number, prof_location, prof_displacement, prof_spec)"
    + "VALUES ($1, $2, $3, $4, $5, $6) RETURNING profid"
    
    pool.query(profQuery, [data.profission, data.regNumber, data.telephone, data.location, data.displacement, data.speciality.split(",")], (errProf, resultProf) => {
        let userQuery = "INSERT INTO users (avatar, full_name, login, email, pass, gender, birth_date, prof_id_fk) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userid, avatar";
            if (errProf) {
            console.log(errProf.stack)
            res.send({error: errProf.message})
            }
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    data.password = hashedPassword;
        pool.query(userQuery, [req.files.avatar[0].path, data.name, data.user, data.email, hashedPassword, data.gender, data.birthDate, resultProf.rows[0].profid] , (errUser, resultUser) =>{
            if (errUser) {
                console.log(errUser.stack)
                res.send({error: errUser.message})
            } else {
                let docsQuery = "INSERT INTO doc_upload (user_id_fk, file_content, file_name) VALUES ($1, $2, $3)"
                req.files.docs.forEach(file => {
                    pool.query(docsQuery, [resultUser.rows[0].userid, file.path, file.originalname], (errDocs, resultDocs) => {
                        if(errDocs) {
                            console.log(errDocs);
                            res.send({error: errDocs.message})
                        } 
                    });
                });
                pool.end();
                res.send({userid: resultUser.rows[0].userid, avatar: resultUser.rows[0].avatar})
            }
        })
    })
});

app.post("/loginUser", (req,res) => {
    var data = (req.body);
    var pool = openConnection();
    let loginQuery = "SELECT userid, pass, avatar FROM users WHERE login = $1";
    pool.query(loginQuery, [data.login], (loginErr, loginResult) => {
        if(loginErr) {
            console.log(loginErr);
        } else if (loginResult.rows[0]) {
            console.log(loginResult.rows[0])
            if(bcrypt.compareSync(data.password, loginResult.rows[0].pass)){
                res.send({userid: loginResult.rows[0].userid, avatar: loginResult.rows[0].avatar});
            }else{
                res.send({error: 'Usúario ou Senha incorreto!'});
            }
            
        } else {
            res.send({error: 'Usúario ou Senha incorreto!'});
        }
    });
});

app.get("/", express.static(path.join(__dirname, "./public")));


app.listen(3001, () => {
 console.log('running on port 3001');
});