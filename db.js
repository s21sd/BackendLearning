const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(() => {   //here U can also set your own database  like procees.env.DB_NAME 
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connected' + err);
})

