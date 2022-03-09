# How to run this project

## 1.Setup database

- create database on your postgresql server
- in backend/.env change setting 
    DB_USER= user name
    DB_PASSWORD= password
    DB_HOST= host link
    DB_PORT= host port
    DB_DATABASE= database name

## 2.Setup

- in backend/server.js function sendMail config nodemailer
    change email
    change password
    make sure you gmail setting smtp in allowed

if you can't setup nodemailer you can get activation link in your email

however you can test account activation by this link
http://localhost:3000/activate?activation=put-key-here&email=test@gmail.com

dont forget to change activation key and email
you can get activation key and email from your database table name account

## 3.Install npm packages

- open terminal in project folder and run command : npm i
- open terminal in backend folder and run command : npm i

## 4.Run the application

- open terminal in backend folder and run command : npm start
- open terminal in project folder and run command : npm start