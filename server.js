const express = require('express');
const cors = require('cors');
const server = express();
const port = 8080;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.log("Connected");
}).catch(err => {
    console.log("Error: ", err);
})

server.use(cors());
server.use(express.json());

server.get('/',  (req, res) => {
    res.json({message: "Server started!"})
})  

server.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
})