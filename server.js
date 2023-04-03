const express = require('express');
const app = express();
const { Pool } = require('pg');
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wowcharactertracker',
    password: 'password',
    port: 5432
})
app.use(express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PATCH, DELETE, OPTIONS");
    next();
  });
// user commands
app.get("/api/users", (req, res) => { // select all users
    pool.query('SELECT * from users', (err, result) => {
        if (err) {
            return res.sendStatus(400);
        }
        else {
            const rows = result.rows;
            res.send(rows);
        }
    });
})
app.get("/api/users/:id", (req, res) => {  // select specific user
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT username FROM users WHERE userID = ' + id + ';', (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            const user = result.rows[0];
            res.send(user);
        }
    })
})
app.post("/api/users", (req, res) => {  // add new user
    let keys = Object.keys(req.body);
    let keysStr = keys.join(', ');
    pool.query("INSERT INTO users (" + keysStr + ") VALUES ($1, $2, $3)",[req.body.userID, req.body.username, req.body.password], (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            res.send(req.body);
        }
    })
})
app.patch("/api/users/:id", (req, res) => {  // update user
    const id = Number.parseInt(req.params.id);
    if (req.body.username) {
        pool.query("UPDATE users SET username = $2 WHERE userID = $1",[id, req.body.username], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    if (req.body.password) {
        pool.query("UPDATE users SET password= $2 WHERE userID = $1",[id, req.body.password], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }

    res.send("Update Complete");
})
app.delete("/api/users/:id", (req, res) => {  // delete user
    const id = Number.parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE userID = $1', [id], (err, data) => {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.send("Data Deleted");
        }
    })  
})

// character commands
app.get("/api/character", (req, res) => { // select all characters in database
    pool.query('SELECT * FROM character', (err, result) => {
        if (err) {
            return res.sendStatus(400);
        }
        else {
            const rows = result.rows;
            res.send(rows);
        }
    });
})
app.get("/api/character/:id", (req, res) => {  // select specific users characters
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT * FROM character WHERE charID = ' + id + ';', (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            const user = result.rows;
            res.send(user);
        }
    })
})
app.get("/api/users/character/:id", (req, res) => {  // select specific users characters
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT * FROM character WHERE userID = ' + id + ';', (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            const user = result.rows;
            res.send(user);
        }
    })
})
app.post("/api/character/:id", (req, res) => {  // add new character
    const id = Number.parseInt(req.params.id);
    let keys = Object.keys(req.body);
    let keysStr = keys.join(', ');
    const newID = Math.floor(Math.random() * 1000000) + 1
    pool.query("INSERT INTO character (charID, charname, dailies, mythic, raid, userID) VALUES ($3, $2, 'false', 0, 0, $1);",[id, req.body.charname, newID], (err, result) => {
        if (err){
            return res.sendStatus(400);
        }
        else {
            res.send(req.body);
        }
    })
})
app.patch("/api/character/:id", (req, res) => {  // update user
    const id = Number.parseInt(req.params.id);
    if (req.body.charname) {
        pool.query("UPDATE character SET charname = $2 WHERE charID = $1",[id, req.body.charname], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    if (req.body.dailies) {
        pool.query("UPDATE character SET dailies = $2 WHERE charID = $1",[id, req.body.dailies], (err, result) => {
            if (err){
                return res.sendStatus(400);
            }
        })
    }
    if (req.body.mythic) {
        if(req.body.mythic === 1){
            pool.query("UPDATE character SET mythic = mythic + 1 WHERE charID = $1",[id], (err, result) => {
                if (err){
                    return res.sendStatus(400);
                }
            })
        }else if(req.body.mythic === -1) {
            pool.query("UPDATE character SET mythic = mythic - 1 WHERE charID = $1",[id], (err, result) => {
                if (err){
                    return res.sendStatus(400);
                }
            })
        }
        
    }
    if (req.body.raid) {
        if(req.body.raid === 1){
            pool.query("UPDATE character SET raid = raid + 1 WHERE charID = $1",[id], (err, result) => {
                if (err){
                    return res.sendStatus(400);
                }
            })
        }else if(req.body.raid === -1) {
            pool.query("UPDATE character SET raid = raid - 1 WHERE charID = $1",[id], (err, result) => {
                if (err){
                    return res.sendStatus(400);
                }
            })
        }
    }
    res.send("Update Complete");
})
app.delete("/api/character/:id", (req, res) => {  // delete user
    const id = Number.parseInt(req.params.id);
    pool.query('DELETE FROM character WHERE charID = $1', [id], (err, data) => {
        if (err) {
            res.sendStatus(400);
        }
        else {
            res.send("Data Deleted");
        }
    })  
})

app.listen(8000, () => {
    console.log('server is running');
})