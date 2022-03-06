const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const { pool } = require("./dbConfig");

const PORT = process.env.PORT || 4000;

var jsonParser = bodyParser.json()

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

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

app.post('/updatecompany', jsonParser, (req, res) => {

    const company = req.body;
    let errors = [];

    pool.query(`UPDATE  company
    SET company_name = $2,
    company_name_katakana = $3,
    address = $4,
    postal_code = $5,
    phone_number = $6,
    email = $7,
    website = $8,
    date_of_establishment = $9,
    remark = $10,
    profile_image = $11
    WHERE id = $1`, [
        company.id,
        company.company_name,
        company.company_name_katakana,
        company.address,
        company.postal_code,
        company.phone_number,
        company.email,
        company.website,
        company.date_of_establishment,
        company.remark,
        company.profile_image
    ], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
            res.json({ message: "company updated" });
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
})

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