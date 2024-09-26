// import dependancies
const express = require("express");
const app = express();
const mysql= require("mysql2");
const dotenv= require("dotenv");

// cors and ejs

// configure enviroment variables
dotenv.config();

// creating a connection object
const db =mysql.createConnection({

    host : process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:  process.env.DB_NAME

})

// TEST THE CONNECTION
db.connect((err)=> {
// if the connection is not successful
if (err){
     return console.log("error connectiong to db:", err)
}

// successfull connecion
console.log("SUCCESSFULLY CONNECTED TO MY SQL:", db.threadId)

})


// retrieve all patients
app.get("", (req,res)=>{
const getPatients= "SELECT * FROM patients"
db.query(getPatients, (err, data)=>{

    if (err){
        return res.status(400).send("Failed to fetch records", err)
    }
    res.status(200).send(data)
});
});




// start and listen to the server

app.listen(3300, () => {
    console.log("server is running on port 3300...")
});