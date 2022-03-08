const express = require("express");
const bodyParser = require('body-parser')
const { pool } = require("./dbConfig");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const randomstring = require("randomstring");
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 4000;

// Public Folders
app.use('/images', express.static(__dirname + '/images'));

// User body Parser
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Set storage Engine
const storage = multer.diskStorage({
    destination: './images/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('profileImage');


// check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Image Only!');
    }
}

// Mail Sender
function sendMail(to, subject, text, html) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'mojapan711@gmail.com',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOption = {
        from: '"React App" <mojapan711@gmail.com>',
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    console.log(`to : ${to}`);
    console.log(`subject : ${subject}`);
    console.log(`text : ${text}`);
    console.log(`html : ${html}`);

    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log('Email Sent!');
    });
}

// activate account
app.post('/activateaccount', (req, res) => {

    const user = req.body;
    let errors = [];

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    pool.query(`UPDATE account
    SET active = 1,
    activation = '',
    name = $2,
    name_katakana = $3,
    employee_number = $4,
    department = $5,
    email = $6,
    phone_number = $7,
    address = $8,
    postal_code = $9,
    date_of_birth = $10,
    remark = $11,
    password = $12
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
        hashedPassword
    ], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
            res.json({ message: 'Your Account Has Been Activated' });
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
});

// get unactive account
app.post('/getunactiveaccount', (req, res) => {

    const account = req.body;
    let errors = [];

    pool.query(`SELECT * from account WHERE email = $1 AND activation = $2`, [account.email, account.activation], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            if (queryRes.rowCount > 0) {
                res.json(queryRes.rows[0]);
                console.log(queryRes.rowCount);
            } else {
                res.status(403).send('account not found email or activation key is wrong!');
            }
        }
    });

    if (errors.length > 0) {
        res.status(403).json({ errors });
    }
});

// Upload company Image
app.post('/uploadcompanyimage', verifyToken, async (req, res) => {
    upload(req, res, (err) => {
        console.log('body', req.body);
        if (err) {
            res.status(403).send(err);
        } else {
            if (req.file == undefined) {
                res.status(403).send('No File Selected!');
            } else {
                pool.query(`UPDATE company
                    SET profile_image = $2
                    WHERE id = $1`, [
                    req.body.id,
                    `http://localhost:4000/images/${req.file.filename}`
                ], (err, queryRes) => {
                    if (err) {
                        console.log(err.stack);
                        throw error;
                    } else {
                        console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
                        res.json({
                            message: 'File Uploaded!',
                            file: `http://localhost:4000/images/${req.file.filename}`,
                        });
                    }
                });
            }
        }
    });
});

// Upload account Image
app.post('/uploadaccountimage', async (req, res) => {
    upload(req, res, (err) => {
        console.log('body', req.body);
        if (err) {
            res.status(403).send(err);
        } else {
            if (req.file == undefined) {
                res.status(403).send('No File Selected!');
            } else {
                pool.query(`UPDATE account
                    SET profile_image = $2
                    WHERE id = $1`, [
                    req.body.id,
                    `http://localhost:4000/images/${req.file.filename}`
                ], (err, queryRes) => {
                    if (err) {
                        console.log(err.stack);
                        throw error;
                    } else {
                        console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
                        res.json({
                            message: 'File Uploaded!',
                            file: `http://localhost:4000/images/${req.file.filename}`,
                        });
                    }
                });
            }
        }
    });
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

// get companie by name
app.post('/getallcompanies', verifyToken, (req, res) => {

    let errors = [];

    pool.query(`SELECT * from company WHERE company_name = $1`, [req.body.company_name], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            res.json(queryRes.rows[0]);
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

    pool.query(`INSERT INTO company(company_name, company_name_katakana, address, postal_code, phone_number, email, website, date_of_establishment, remark)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
        company.company_name,
        company.company_name_katakana,
        company.address,
        company.postal_code,
        company.phone_number,
        company.email,
        company.website,
        company.date_of_establishment,
        company.remark
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
    remark = $10
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
        company.remark
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

// get accounts by company name
app.post('/getaccountsbycompanyname', verifyToken, (req, res) => {

    const user = req.body;
    let errors = [];

    pool.query(`SELECT * from account WHERE company_name = $1`, [user.company_name], (err, queryRes) => {
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

// get account by id
app.get('/getaccountbyid', verifyToken, (req, res) => {

    let errors = [];

    pool.query(`SELECT * from account WHERE id = $1`, [req.decoded.payload.id], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            res.json(queryRes.rows[0]);
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

    const activation = randomstring.generate();

    pool.query(`INSERT into account(company_name, email, type, activation, active)
    VALUES ($1, $2, $3, $4, $5)`, [
        account.company_name,
        account.email,
        account.type,
        activation,
        0
    ], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
            sendMail(account.email, 'Activation Code!', `Welcome to My App, Click on the link to activate your account http://localhost:3000/activate?activation=${activation}&email=${account.email}`, `<h1>My App</h1><p>Welcome to my app, Click on the link to activate your account <a href="http://localhost:3000/activate?activation=${activation}&email=${account.email}">Activate Account</a></p>`);
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
    remark = $11
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
        user.remark
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
});

// requesting user
app.post('/requestinguser', verifyToken, (req, res) => {

    const user = req.body;
    let errors = [];

    console.log('user', user);

    pool.query(`UPDATE account
    SET active = $2
    WHERE id = $1`, [
        user.id,
        -1
    ], (err, queryRes) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(queryRes.command + ' rows : ' + queryRes.rowCount);
            res.json({ message: "user requestined" });
        }
    });

    if (errors.length > 0) {
        res.json({ errors });
    }
});

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