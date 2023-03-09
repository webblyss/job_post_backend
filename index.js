const express = require('express');
const app = express()
const mongoose = require("mongoose");
require("dotenv").config()
const cors = require("cors");
const bodyParser = require("body-parser")
const port = process.env.PORT || 8000

// IMPORT ROUTES
const job = require("./routes/routes")


// MIDDLE WARES
app.use(cors())
app.use(bodyParser.json())
app.use("/api",job)

mongoose.connect(
    process.env.CONNECT_STRING,
    {
      useNewUrlParser: true,
    }
  ).then(()=>{
    console.log("connected")
  })

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
