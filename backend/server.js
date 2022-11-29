const mariadb = require('mariadb')
const express = require('express')
const app = express()
var cors = require('cors')

require('dotenv').config()

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database : process.env.DB_DTB,
    user : process.env.DB_USER,
    password : process.env.DB_PWD
})

app.use(express.json())
app.use(cors())

app.get('/film', async(req, res) =>{
    let conn;
    console.log('Connexion')
    conn = await pool.getConnection();
    console.log('Requète');
    const rows = await conn.query('SELECT * FROM film;')
    console.log(rows);
    res.status(200).json(rows)
})

app.get('/film/:id', async(req, res) =>{
    let conn;
    let id = parseInt(req.params.id)
    console.log('Connexion')
    conn = await pool.getConnection();
    console.log('Requète');
    const rows = await conn.query(`SELECT * FROM film WHERE id = ${id};`)
    console.log(rows);
    res.status(200).json(rows)
})

app.post('/film',async(req,res)=>{
    let conn;
    console.log('Connexion');
    conn = await pool.getConnection();
    console.log('Requète');
    await conn.query('INSERT INTO film(titre, duree) VALUES (?,?)',[req.body.titre,req.body.duree])
    const rows = await conn.query('SELECT * FROM film;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
})

app.put('/film/:id',async(req,res)=>{
    let conn;
    let id = parseInt(req.params.id)
    console.log('Connexion');
    conn = await pool.getConnection();
    console.log('Requète');
    await conn.query(`UPDATE film SET titre = ?, duree = ? WHERE id = ${id}`,[req.body.titre,req.body.duree])
    const rows = await conn.query('SELECT * FROM film;')    
    console.log('Requète effectué');
    res.status(200).json(rows)
})

app.delete('/film/:id', async(req, res) =>{
    let conn;
    let id = parseInt(req.params.id)
    console.log('Connexion')
    conn = await pool.getConnection();
    console.log('Requète');
    await conn.query(`DELETE FROM film WHERE id = ?;`,[id])
    const rows = await conn.query(`SELECT * FROM film;`)
    console.log(rows);
    res.status(200).json(rows)
})

app.listen(8000, () =>{
    console.log("Serveur à l'écoute");
} )