const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const catRoutes = require('./routes/cats.js');
const userRoutes = require('./routes/users');
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    // useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    // useFindAndModify : false,
})

const connection = mongoose.connection;
connection.on("open", () => {
    console.log("MongoDB Connection success!");
})

app.use("/cats", catRoutes)
app.use("/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
})