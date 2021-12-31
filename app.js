const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

//const errorHandler = require('./lib/errorhandler')

mongoose.connect('mongodb://localhost/nodekb')
let db = mongoose.connection

db.once('open',function(){
    console.log('Connected to MongoDB')
});

db.on('error',function(err){
    console.log(err)
})

const app=express()

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())

//app.use(errorHandler)
app.get("/payment", (req, res) => {
    res.json({ success: true, message: "API running" });
});

let payment = require('././modules/paymentModule/routes/paymentGateway')
//let users = require('././modules/userModule/routes/authentication')
app.use('/payment',payment);


app.listen(8000,function(){
    console.log('Server running at port no. 8000')
})

