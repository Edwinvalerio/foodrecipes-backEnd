const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
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

// SIGN UP
app.post("/signup", function(req, res) {
  res.json(req.body.signUpData);
  let signUpData = req.body.SignUpData;
  let { firstName, lastName, userName, email, password } = signUpData;

  //   create accout
  let createAccount = `INSERT INTO users (firstName, lastName, userName, email, password) VALUES ('${firstName}','${lastName}', '${userName}', '${email}', '${password}' );`;
  connection.query(createAccount, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
});

// EXPRESS LISTENERS
app.listen(port, () => {
  console.log("listening on port: ", port);
});
