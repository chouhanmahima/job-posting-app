const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const jobRoutes = require("./routers/job");

const app = express();

dotenv.config();

// JSON Parsing middleware
app.use(express.json());
// console.log("URL=>", process.env.DB_CONNECTION_URL );

//Mongoose Connection 
mongoose.connect(process.env.DB_CONNECTION_URL) // connection string
.then(() => console.log("Connection with Database established successfully"))
.catch((err) => console.log("ERROR CONNECTING WITH DATABASE", err))

// API routes attach in index file
app.use(jobRoutes);

const PORT = 10000;  //4000
app.listen(PORT,()=>{
    console.log("Server up and running at port", PORT)
})