const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const { pool } = require("./dbConfig");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 4000;

// User body Parser
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// get all companies
app.get('/getallcompanies', verifyToken, (req, res) => {

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

// add company
app.post('/addcompany', verifyToken, (req, res) => {

    const company = req.body;
    let errors = [];

    pool.query(`INSERT INTO company(company_name, company_name_katakana, address, postal_code, phone_number, email, website, date_of_establishment, remark, profile_image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [
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
            res.json({ message: "company created" });
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
});

// update company
app.post('/updatecompany', verifyToken, (req, res) => {

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
});

// get all accounts
app.get('/getallaccounts', verifyToken, (req, res) => {

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

// add account
app.post('/addaccount', verifyToken, (req, res) => {

    const account = req.body;
    let errors = [];

    pool.query(`INSERT into account(company_name, email, type)
    VALUES ($1, $2, $3)`, [
        account.company_name,
        account.email,
        account.type
    ], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
            res.json({ message: "account created" });
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
})

// search account
app.post('/searchaccount', verifyToken, (req, res) => {
    const search = req.body;
    let errors = [];

    console.log('search', search);

    pool.query(`SELECT *
    from account
    WHERE company_name = $1
    AND type = $2
    AND (name LIKE $3
    OR email LIKE $3)`, [
        search.company_name,
        search.type,
        '%' + search.query + '%'
    ], (err, queryRes) => {
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


// update user
app.post('/updateuser', verifyToken, (req, res) => {

    const user = req.body;
    let errors = [];

    console.log('user', user);

    pool.query(`UPDATE account
    SET name = $2,
    name_katakana = $3,
    employee_number = $4,
    department = $5,
    email = $6,
    phone_number = $7,
    address = $8,
    postal_code = $9,
    date_of_birth = $10,
    remark = $11,
    profile_image = $12
    WHERE id = $1`, [
        user.id,
        user.name,
        user.name_katakana,
        user.employee_number,
        user.department,
        user.email,
        user.phone_number,
        user.address,
        user.postal_code,
        user.date_of_birth,
        user.remark,
        user.profile_image
    ], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
            res.json({ message: "user updated" });
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
})

// Login
app.post('/login', (req, res) => {

    const user = req.body;
    console.log("user : ", user);

    pool.query(`SELECT * FROM account WHERE email = $1`, [user.email], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else if (queryRes.rows === undefined || queryRes.rows == 0) {
            res.status(401).send('login incorrect!');
        } else {
            if (queryRes.rows[0].password == null) {
                res.status(401).send('Your Account is not Active!');
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(user.password, salt);
                bcrypt.compare(user.password, queryRes.rows[0].password, function (err, result) {
                    if (err) {
                        console.log(err.stack);
                    } else if (result == true) {
                        const token = jwt.sign({ id: queryRes.rows[0].id }, 'secretkey', { algorithm: 'HS256', expiresIn: '1d' });
                        res.json({ token });
                    }
                    else {
                        res.status(401).send('password incorrect!');
                    }
                });
            }
        }
    });
});

// Verifying Token Middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.decoded = jwt.decode(bearerToken, { complete: true });
        req.token = bearerToken;
        if (bearerToken === 'null') {
            return res.status(401).send('incorrect token!');
        }
        jwt.verify(bearerToken, 'secretkey', { algorithm: 'HS256' }, (err, authData) => {
            if (err)
                return res.status(401).send('incorrect token!');
            next();
        });
    } else {
        return res.status(401).send('token not found!');
    }
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});