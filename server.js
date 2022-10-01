const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const Server = require("socket.io");
require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

const io = Server(server);

io.on("connection", (socket) => {
  console.log(`User Connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User With ID : ${socket.id} joined room : ${data}`)
  });

  // socket.on('in user notice', (data) => {
  //   console.log(data)
  //   socket.broadcast.in(data.room).emit("in user notice", data.content)
  // })

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

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
  var LEADER_NAME = req.body.LEADER_NAME;
  var LEADER_PW = req.body.LEADER_PW;

  const sqlQuery =
    "SELECT LEADER_NAME, LEADER_PW, count(*) as 'cnt' FROM LEADER_TBL WHERE LEADER_NAME = ? AND LEADER_PW = ?;";
  db.query(sqlQuery, [LEADER_NAME, LEADER_PW], (err, result) => {
    res.send(result);
  });
});

app.post("/leaderjoin", (req, res) => {
  var LEADER_NAME = req.body.LEADER_NAME;
  var LEADER_PW = req.body.LEADER_PW;
  var LEADER_TEAM = req.body.LEADER_TEAM;
  var LEADER_GRADE = req.body.LEADER_GRADE;
  var LEADER_CLASS = req.body.LEADER_CLASS;

  const sqlQuery = "INSERT INTO LEADER_TBL VALUES (?, ?, ?, ?, ?, 100);";
  db.query(
    sqlQuery,
    [LEADER_NAME, LEADER_PW, LEADER_TEAM, LEADER_GRADE, LEADER_CLASS],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/memberlogin", (req, res) => {
  var MEMBER_NAME = req.body.MEMBER_NAME;
  var MEMBER_PW = req.body.MEMBER_PW;

  const sqlQuery =
    "SELECT MEMBER_NAME, MEMBER_PW, count(*) as 'cnt' FROM MEMBER_TBL WHERE MEMBER_NAME = ? AND MEMBER_PW = ?;";
  db.query(sqlQuery, [MEMBER_NAME, MEMBER_PW], (err, result) => {
    res.send(result);
  });
});

app.post("/memberjoin", (req, res) => {
  var MEMBER_NAME = req.body.MEMBER_NAME;
  var MEMBER_PW = req.body.MEMBER_PW;
  var MEMBER_CLASS = req.body.MEMBER_CLASS;
  var MEMBER_GACHI = req.body.MEMBER_GACHI;

  const sqlQuery = "INSERT INTO MEMBER_TBL VALUES (?, ?, ?, ?);";
  db.query(
    sqlQuery,
    [MEMBER_NAME, MEMBER_PW, MEMBER_CLASS, MEMBER_GACHI],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/class", (req, res) => {
  var LEADER_NAME = req.body.LEADER_NAME;
  const sqlQuery = "SELECT LEADER_CLASS FROM LEADER_TBL WHERE LEADER_NAME = ?;";
  db.query(sqlQuery, [LEADER_NAME], (err, result) => {
    res.send(result);
  });
});

app.post("/leaderlist", (req, res) => {
  var LEADER_CLASS = req.body.LEADER_CLASS;
  const sqlQuery =
    "SELECT LEADER_NAME, LEADER_TEAM, LEADER_GRADE, LEADER_CLASS, LEADER_COIN FROM LEADER_TBL WHERE LEADER_CLASS = ?;";
  db.query(sqlQuery, [LEADER_CLASS], (err, result) => {
    res.send(result);
  });
});

app.post("/leaderinfo", (req, res) => {
  var leadername = req.body.leaderName;
  const sqlQuery = "SELECT * FROM LEADER_TBL WHERE LEADER_NAME = ?";
  db.query(sqlQuery, [leadername], (err, result) => {
    res.send(result);
  });
});

app.post("/classchoice", (req, res) => {
  const sqlQuery =
    "SELECT CLASS_NAME, CLASS_MAIN, CLASS_SUB, CLASS_LANG, CLASS_PATH FROM CLASS_TBL;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/memberinfo", (req, res) => {
  var memberName = req.body.MEMBER_NAME;
  const sqlQuery = "SELECT * FROM MEMBER_TBL WHERE MEMBER_NAME = ?";
  db.query(sqlQuery, [memberName], (err, result) => {
    res.send(result);
  });
});

app.post("/memberlist", (req, res) => {
  var MEMBER_CLASS = req.body.MEMBER_CLASS;
  const sqlQuery =
    "SELECT MEMBER_NAME, MEMBER_CLASS, MEMBER_GACHI, MEMBER_CLASS FROM MEMBER_TBL WHERE MEMBER_CLASS = ? ORDER BY MEMBER_GACHI DESC;";
  db.query(sqlQuery, [MEMBER_CLASS], (err, result) => {
    res.send(result);
  });
});

app.post("/mylist", (req, res) => {
  var LEADER_NAME = req.body.LEADER_NAME;
  const sqlQuery =
    "SELECT LEADER_NAME, LEADER_TEAM, LEADER_GRADE, LEADER_CLASS, LEADER_COIN FROM LEADER_TBL WHERE LEADER_NAME = ?;";
  db.query(sqlQuery, [LEADER_NAME], (err, result) => {
    res.send(result);
  });
});

app.post("/auctineerSearch", (req, res) => {
  const sqlQuery =
    "SELECT AUCTIONEER_NAME, AUCTIONEER_APPEAL, DATE_FORMAT(AUCTIONEER_DATE, '%y-%m-%d') AS AUCTIONEER_date, TIME_TO_SEC(DATE_ADD(AUCTIONEER_date, INTERVAL (AUCTIONEER_TIMER) MINUTE)) AS AUCTIONEER_timer, AUCTIONEER_GACHI FROM AUCTIONEER_TBL;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/auctioneerCreate", (req, res) => {
  var AUCTIONEER_NAME = req.body.ACTIONEER_NAME;
  var AUCTIONEER_APPEAL = req.body.ACTIONEER_APPEAL;
  var AUCTIONEER_TIMER = req.body.ACTIONEER_TIMER;
  var AUCTIONEER_GACHI = req.body.ACTIONEER_GACHI;
  var AUCTIONEER_CLASS = req.body.ACTIONEER_CLASS;
  const sqlQuery =
    "INSERT INTO AUCTIONEER_TBL (AUCTIONEER_NAME, AUCTIONEER_CLASS, AUCTIONEER_APPEAL, AUCTIONEER_TIMER, AUCTIONEER_GACHI) VALUES (?,?,?,?,?);";
  db.query(
    sqlQuery,
    [
      AUCTIONEER_NAME,
      AUCTIONEER_CLASS,
      AUCTIONEER_APPEAL,
      AUCTIONEER_TIMER,
      AUCTIONEER_GACHI,
    ],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/auctionDelete", (req, res) => {
  var num = req.body.num;
  const sqlQuery = "DELETE FROM AUCTIONEER_TBL WHERE AUCTIONEER_INDEX = ?;";
  db.query(sqlQuery, [num], (err, result) => {
    res.send(result);
  });
});

app.post("/leadercategory", (req, res) => {
  var LEADER_CLASS = req.body.LEADER_CLASS;
  const sqlQuery =
    "SELECT LEADER_NAME, LEADER_TEAM, LEADER_GRADE, LEADER_CLASS, LEADER_COIN FROM LEADER_TBL WHERE LEADER_CLASS = ?;";
  db.query(sqlQuery, [LEADER_CLASS], (err, result) => {
    res.send(result);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener);
});
