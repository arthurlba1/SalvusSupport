const express = require('express');
require('dotenv/config');
const app = express();
var cors = require('cors');
const { Pool, Client } = require('pg');
const client = new Client();

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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

app.post("/createUser",(req,res) => {
    var data = (req.body);
    var pool = openConnection();
    let profQuery = "INSERT INTO professional_info (prof_id_fk, prof_reg_number, prof_number, prof_location, prof_displacement, prof_spec)"
    + "VALUES ($1, $2, $3, $4, $5, $6) RETURNING profid"
    console.log([data.profission, data.regNumber, data.telephone, data.location, data.displacement, data.speciality]);
    pool.query(profQuery, [data.profission, data.regNumber, data.telephone, data.location, data.displacement, data.speciality], (errProf, resultProf) => {
        let userQuery = "INSERT INTO users (avatar, full_name, login, email, pass, gender, birth_date, prof_id_fk) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userid";
            if (errProf) {
            console.log(errProf.stack)
            }
            //console.log(resultProf)
            
        pool.query(userQuery, [data.avatar, data.name, data.user, data.email, data.password, data.gender, data.birthDate, resultProf.rows[0].profid] , (errUser, resultUser) =>{
            if (errUser) {
                console.log(errUser.stack)
            } else {
                console.log(resultUser.rows[0])
                res.send(resultUser)
            }
        })
    })
});
app.listen(3001, () => {
 console.log('running on port 3001');
});