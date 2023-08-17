const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
})
.then(() => {
    console.log("MongoDB Connected...")
})
.catch(err => console.log(err.message));