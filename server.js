const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: "*",
  credential: true,
};

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(cors(corsOptions));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

app.post("/leaderlogin", (req, res) => {
  var leader_name = req.body.leader_name;
  var leader_pw = req.body.leader_pw;

  const sqlQuery =
    "select leader_name, leader_pw, count(*) as 'cnt' from leader_tbl where leader_name=? and leader_pw=?;";
  db.query(sqlQuery, [leader_name, leader_pw], (err, result) => {
    res.send(result);
  });
});

app.post("/leaderjoin", (req, res) => {
  var leader_name = req.body.leader_name;
  var leader_pw = req.body.leader_pw;
  var leader_hope = req.body.leader_hope;
  var leader_grade = req.body.leader_grade;
  var leader_class = req.body.leader_class;

  const sqlQuery =
    "insert into leader_tbl values (?,?,?,?,?);";
  db.query(sqlQuery, [leader_name, leader_pw, leader_hope, leader_grade, leader_class], (err, result) => {
    res.send(result);
  });
});

app.post("/memberlogin", (req, res) => {
  var member_name = req.body.member_name;
  var member_pw = req.body.member_pw;

  const sqlQuery =
    "select member_name, member_pw, count(*) as 'cnt' from member_tbl where member_name=? and member_pw=?;";
  db.query(sqlQuery, [member_name, member_pw], (err, result) => {
    res.send(result);
  });
});

app.post("/memberjoin", (req, res) => {
  var member_name = req.body.member_name;
  var member_pw = req.body.member_pw;
  var member_hope = req.body.member_hope;
  var member_class = req.body.member_class;

  const sqlQuery =
    "insert into member_tbl values (?,?,?,?);";
  db.query(sqlQuery, [member_name, member_pw, member_hope, member_class], (err, result) => {
    res.send(result);
  });
});


app.post("/class", (req, res) => {
  var leader_name = req.body.leader_name;

  const sqlQuery =
    "SELECT leader_class FROM leader_tbl WHERE leader_name = ?;";
  db.query(sqlQuery, [leader_name], (err, result) => {
    res.send(result);
  });
});

app.post("/auction", (req, res) => {
  var leader_class = req.body.leader_class;
  const sqlQuery =
    "SELECT leader_name, leader_hope, leader_grade, leader_class FROM leader_tbl";
  db.query(sqlQuery, [leader_class], (err, result) => {
    res.send(result);
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port` + listener);
});