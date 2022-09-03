// server/index.js

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { json } = require("express");
const data = fs.readFileSync("database/users.json");
const jsonData = JSON.parse(data);

__dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/users", function (req, res, next) {
  res.status(200).json(jsonData);
});

app.post("/users", function (req, res, next) {
  const { firstName, lastName, email, gender, race } = req.body;

  jsonData.users.push({
    id: jsonData.users.length + 1,
    first_name: firstName,
    last_name: lastName,
    email,
    gender,
    race,
  });

  fs.writeFileSync(
    "database/users.json",
    JSON.stringify(jsonData),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );

  res.status(201).json(jsonData);
});

app.post("/users/:id", function (req, res, next) {
  const { id } = req.params;
  const { firstName, lastName, email, gender, race } = req.body;
  const newUser = {
    id,
    first_name: firstName,
    last_name: lastName,
    email,
    gender,
    race,
  };

  const updatedUsers = jsonData.users.map((user) =>
    user.id === Number(id) ? newUser : user
  );

  fs.writeFileSync(
    "database/users.json",
    JSON.stringify({ users: updatedUsers }),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );

  res.status(201).json({ users: updatedUsers });
});

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../excel-to-json-converter/build"))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        "../excel-to-json-converter",
        "build",
        "index.html"
      )
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running...");
  });
}


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
