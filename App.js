const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
require("dotenv").config();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD, //THIS IS YOUR SQL PASSWORD
  database: "gofoodapp"
});

////////////////////////////////////////////////////////////////
//             API HEADER ALLOWE
////////////////////////////////////////////////////////////////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

/*============================================
    CREATE ACCOUNT
============================================*/
app.post("/signup", function(req, res) {
  let signUpData = req.body.SignUpData;
  let { firstName, lastName, userName, email, password } = signUpData;

  //   QUERY
  let createAccount = `INSERT INTO users 
  (firstName, lastName, userName, email, password) 
  VALUES ('${firstName}','${lastName}', '${userName}', '${email}', '${password}' );`;

  //   CREATE
  connection.query(createAccount, (err, response) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        console.log(err);
        res.send({ success: false, message: "user name or email taken" });
      }
      console.log(err.code);
    }
  });
});

// connection.query("SELECT * FROM users;", (err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

// EXPRESS LISTENERS
app.listen(port, () => {
  console.log("listening on port: ", port);
});
