const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Router = require('./Routes/server.routes');
const app = express()
app.use(express.json())
app.use(cors())
app.use("/", Router)

const dotenv = require('dotenv');

dotenv.config();


app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("server started ...")
})