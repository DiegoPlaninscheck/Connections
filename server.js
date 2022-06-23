const express = require("express");
const cors = require("cors");
const server = express();
const port = 8080;

server.use(cors());
server.use(express.json());

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

const User = sequelize.define(
  "users",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

server.post("/user", (req, res) => {
    const {firstName, lastName} = req.body;
    User.create({firstName, lastName}).then(() => {
        res.json({message: "User created successfully"})
    }).catch(err => {
        res.json({err: "Error creating user"})
    });
});


server.get("/", (req, res) => {
  res.json({ message: "Server started!" });
});

server.listen(port, async () => {
    await sequelize.sync();
    console.log(`Server start at http://localhost:${port}`);
});
