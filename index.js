const MovieModel = require("./database/movies");
const UserModel = require("./database/users");
require('dotenv').config()
const express = require("express");
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));

// http://localhost:3001/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the BookMyShow`});
});

// http://localhost:3001/movies
app.get("/movies", async (req, res) => {
    const getAllMovies = await MovieModel.find();
    return res.json(getAllMovies);
});

// http://localhost:3001/movie/:id
app.get("/movies/:id", async (req, res) => {
    const {id} = req.params;
    const getMovie = await MovieModel.findOne({_id: id});
    return res.json(getMovie);
});

// http://localhost:3001/user-register
app.post("/user-register", async (req, res) => {
    const addNewUser = await UserModel.create(req.body);
    return res.json( {userAdded: addNewUser, message: "User was added !!!"} );
});



app.listen(3001, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});