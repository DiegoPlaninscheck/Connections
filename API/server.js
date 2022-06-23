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

server.get("/users", async (req, res) => {
    const user = await User.findAll();
    res.status(200).json(user)
})

server.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id)
    res.status(200).json(user)
})

server.post("/user", (req, res) => {
    const { firstName, lastName } = req.body;
    User.create({ firstName, lastName }).then(() => {
        res.json({ message: "User created successfully" })
    }).catch(err => {
        res.json({ err: "Error creating user" })
    });
});

server.patch("/users/:id", async (req, res) => {
    const { firstName, lastName } = req.body;
    const id = req.params.id;
    try {
        const result = await User.update(
            { firstName, lastName },
            { where: { id: id } }
        );
        res.json(result);
    } catch (error) {
        res.json(error.message)
    }
});

server.delete("/users/:id", async(req, res) => {
    const id = req.params.id;
    try{
        await User.destroy({where: {id: id}})
        res.json({message: "User deleted!"})
    }catch(error){
        res.json({error: error})
    }
})

server.get("/", (req, res) => {
    res.json({ message: "Server started!" });
});

server.listen(port, async () => {
    await sequelize.sync();
    console.log(`Server start at http://localhost:${port}`);
});
