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
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      
            cb(null, './uploads/');
      },
      filename: function(req, file, cb) {
        bcrypt.genSalt(2).then(name => {
            
            cb(null, req.body.user + name.replace('/', '-').replace('\\', '-')+ path.extname(file.originalname));
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
        let userQuery = "INSERT INTO users (avatar, full_name, login, email, pass, gender, birth_date, prof_id_fk) VALUES($1, $2, $3, $4, $5, $6, $7, $8)" 
        + "RETURNING userid, avatar,full_name, email, gender, birth_date, prof_id_fk";
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
                let docsQuery = "INSERT INTO doc_upload (user_id_fk, file_content, file_name) VALUES ($1, $2, $3) returning file_content"
                req.files.docs.forEach(file => {
                    console.log(file.originalname)
                    pool.query(docsQuery, [resultUser.rows[0].userid, file.path, file.originalname], (errDocs, resultDocs) => {
                        if(errDocs) {
                            console.log(errDocs);
                            res.send({error: errDocs.message})
                        } else{
                            console.log(resultDocs.rows[0].file_content)
                        }
                    });
                });
                res.send({userid: resultUser.rows[0].userid, avatar: resultUser.rows[0].avatar, name: resultUser.rows[0].full_name, email: resultUser.rows[0].email, gender: resultUser.rows[0].gender,
                birth_date: resultUser.rows[0].birth_date, prof_id_fk: resultUser.rows[0].prof_id_fk});
            }
        });
    });
});

app.post("/loginUser", (req,res) => {
    var data = (req.body);
    var pool = openConnection();
    let loginQuery = "SELECT userid, pass, full_name, avatar, email, gender, birth_date, prof_id_fk FROM users WHERE login = $1";
    pool.query(loginQuery, [data.login], (loginErr, loginResult) => {
        if(loginErr) {
            console.log(loginErr);
        } else if (loginResult.rows[0]) {
            console.log(loginResult.rows[0])
            if(bcrypt.compareSync(data.password, loginResult.rows[0].pass)){
                res.send({userid: loginResult.rows[0].userid, avatar: loginResult.rows[0].avatar, name: loginResult.rows[0].full_name, email: loginResult.rows[0].email, gender: loginResult.rows[0].gender,
                    birth_date: loginResult.rows[0].birth_date, prof_id_fk: loginResult.rows[0].prof_id_fk, });
            }else{
                res.send({error: 'Usúario ou Senha incorreto!'});
            }
            
        } else {
            res.send({error: 'Usúario ou Senha incorreto!'});
        }
    });
});

app.get("/profile/:id", (req, res)=>{
    var pool = openConnection();
    var profInfoQuery = "SELECT prof_reg_number, prof_number, prof_displacement, prof_spec, prof_id_fk, prof_name FROM professional_info INNER JOIN profission ON professional_info.prof_id_fk = profission.prof_id WHERE profid = $1";
    pool.query(profInfoQuery, [req.params.id], (errProfile, profileResult) => {
        if(errProfile){
            console.log(errProfile);
        } else {
            res.send({regNumber: profileResult.rows[0].prof_reg_number, number: profileResult.rows[0].prof_number, displacement: profileResult.rows[0].prof_displacement, spec: profileResult.rows[0].prof_spec, prof_fk: profileResult.rows[0].prof_id_fk ,profission: profileResult.rows[0].prof_name});
        }
    });
});

app.get("/files/:id", (req, res) => {
    var pool = openConnection();
    var userFilesQuery = "SELECT file_content, file_name FROM doc_upload WHERE user_id_fk = $1";
    pool.query(userFilesQuery, [req.params.id], (errFiles, filesResult) => {
        if(errFiles) {
            console.log(errFiles);
        } else {
            res.send(filesResult.rows);
        }
    });
});

app.get("/spec/:id", (req, res) => {
    var pool = openConnection();
    var specsQuery = "SELECT * FROM speciality WHERE prof_id_fk = $1";
    pool.query(specsQuery, [req.params.id], (errSpec, specsResult) => {
        if (errSpec){
            console.log(errSpec)
        } else {
            res.send(specsResult.rows);
        }
    });
});

app.get("/getCount", (req,res) => {
    var pool = openConnection();
    var countQuery = "SELECT COUNT(*) FROM professional_info WHERE prof_id_fk = $1";
    var totalCountQuery = "SELECT COUNT(*) FROM professional_info";
    pool.query(countQuery, [1], (errCount1, resultCount1) => {
        if (errCount1){
            console.log(errCount1);
        }
    pool.query(countQuery, [2], (errCount2, resultCount2) => {
        if  (errCount2) {
            console.log(errCount2)
        }
    pool.query(countQuery, [3], (errCount3, resultCount3) => {
        if (errCount3) {
            console.log(errCount3);
        }
    pool.query(countQuery, [4], (errCount4, resultCount4) => {
        if (errCount4) {
            console.log(errCount4);
        }
    pool.query(totalCountQuery, (errCount5, resultCount5) =>{
        if(errCount5) {
            console.log(errCount5)
        } else {
            res.send({medic: resultCount1.rows[0].count, audiologist: resultCount2.rows[0].count, nurseTech: resultCount3.rows[0].count, nurse: resultCount4.rows[0].count, total: resultCount5.rows[0].count});
            pool.end();
        }
    });
    });
    });
    }); 
    });
})
app.get("/", express.static(path.join(__dirname, "./public")));

app.listen(3001, () => {
 console.log('running on port 3001');
});