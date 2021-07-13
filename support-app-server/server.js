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
    pool.query("SELECT prof_name, prof_id FROM profission" , (err, result) => {
        res.send(result.rows)
        pool.end();
    });
});

app.get("/getProfSpec", (req,res) => {
    var pool = openConnection();
    pool.query("SELECT s.spec_name from profission INNER JOIN speciality s ON s.prof_id_fk = prof_id" , (err, result) => {
        res.send(result.rows)
        pool.end();
    });
});

app.post("/createUser",(req,res) => {
    var data = (req.body);
    var pool = openConnection();
    let query = "INSERT INTO users (email, full_name, pass, login) VALUES($1, $2, $3, $4)";
    pool.query(query, [data.email, data.name, data.password, data.user] , (err, result) =>{
        if (err) {
            console.log(err.stack)
          } else {
            console.log(result.rows[0])
          }
    })
    return res.status;
});

app.listen(3001, () => {
 console.log('running on port 3001');
});