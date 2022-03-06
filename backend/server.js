const express = require("express");
const app = express();
const { pool } = require("./dbConfig");

const PORT = process.env.PORT || 4000;

// get all companies
app.get('/getallcompanies', (req, res) => {

    let errors = [];

    pool.query(`SELECT * from company`, (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            res.json(queryRes.rows);
            console.log(queryRes.rows);
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
});

// get all accounts
app.get('/getallaccounts', (req, res) => {

    let errors = [];

    pool.query(`SELECT * from account`, (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            res.json(queryRes.rows);
            console.log(queryRes.rows);
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});