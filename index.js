const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./routers/job");

const app = express();

// JSON Parsing middleware
app.use(express.json());

//Mongoose Connection 
mongoose.connect("mongodb://localhost:27017/jobapp")
.then(() => console.log("Connection with Database established successfully"))
.catch((err) => console.log("ERROR CONNECTING WITH DATABASE", err))

// API routes attach in index file
app.use(jobRoutes);

const PORT = 4000;
app.listen(PORT,()=>{
    console.log("Server up and running at port", PORT)
})