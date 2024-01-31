const express = require('express')
const app = express()
const port = 3000;

 const config = {
    host: 'db',
    user:'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql2')
const connection = mysql.createConnection(config)

 const createTable = `CREATE TABLE people(id int auto_increment, name varchar(255), primary key(id))`
connection.query(createTable) 

const sql = `INSERT INTO people(name) values('Poliana'), ('Andre'), ('Alice')`
connection.query(sql) 

app.get('/people', (req, res) => {
    const sql = 'SELECT * FROM people';

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);

        connection.end();
    });
});

app.get('/', (req, res)=>{

    const sql = 'SELECT name FROM people';

     connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Mapeia os resultados para obter apenas os nomes
        const names = results.map(result => result.name);

        const htmlResponse = `
            <h1>Full Cycle</h1>
            <p>Nomes cadastrados: ${names.join(', ')}</p>
        `
        
           res.send(htmlResponse)
        ;
    }) 
;


});

app.listen(port, ()=>{
    console.log("Rodando na porta" + port);
})