const mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    dbName: 'todoAPP'
})
    .then(() => {
        console.log('Mongodb Connected');
    })
    .catch((err) => {
        console.log('Mongo connection failed ' + err);
    })