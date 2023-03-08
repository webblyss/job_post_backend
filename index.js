const express = require('express');
const app = express()
const mongoose = require("mongoose");
require("dotenv").config()
const cors = require("cors");
const bodyParser = require("body-parser")
const port = process.env.PORT || 8000

// IMPORT ROUTES
const job = require("./routes")


// MIDDLE WARES
app.use(cors())



app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
