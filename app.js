// B1: Khởi tạo server
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

// request từ phía client
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/public/html/index.html");
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.get("/round/:id", (req, res) => {
  try {
    res.sendFile(__dirname + "/public/html/game.html");
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.get("/api/v1/player", (req, res) => {
  try {
    let player = JSON.parse(fs.readFileSync("./api/player.json"));
    res.json(player);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/api/v1/round", (req, res) => {
  try {
    let round = JSON.parse(fs.readFileSync("./api/round.json"));
    res.json(round);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Tạo POST request với đường dẫn “/api/v1/player”
app.post("/api/v1/player", (req, res) => {
  let { name, name1, name2, name3 } = req.body;
  console.log(req.body);
  if (!name || !name1 || !name2 || !name3) {
    res.json({
      message: "Thông tin không để trống",
    });
  } else {
    let newName = {
      id: Math.floor(Math.random() * 1000000),
      name: name,
      name1: name1,
      name2: name2,
      name3: name3,
    };
    try {
      let names = JSON.parse(fs.readFileSync("./api/player.json"));
      names.push(newName);
      fs.writeFileSync("./api/player.json", JSON.stringify(names));
      res.json({
        message: "Create successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

// Tạo POST request với đường dẫn “/api/v1/round”
app.post("/api/v1/round", (req, res) => {
  let { point1, point2, point3, point4 } = req.body;
  if (!point1 || !point2 || !point3 || !point4) {
    res.json({
      message: "Thông tin không để trống",
    });
  } else {
    let newRound = {
      id: Math.floor(Math.random() * 1000000),
      point1: point1,
      point2: point2,
      point3: point3,
      point4: point4,
    };
    try {
      let rounds = JSON.parse(fs.readFileSync("./api/round.json"));
      rounds.push(newRound);
      fs.writeFileSync("./api/round.json", JSON.stringify(rounds));
      res.json({
        message: "Create successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

// Cài đặt cho server luôn luôn chờ đợi và lắng nghe
// Các request gửi lên từ phía client
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
