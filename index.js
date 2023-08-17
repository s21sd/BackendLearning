const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const cors = require("cors");
const authRoutes=require('./ROUTES/authRoutes');
const blogRoutes=require('./ROUTES/blogRoutes');
require('dotenv').config();
require('./db');
app.use(cors());
app.use(bodyParser.json());
app.use('/users',authRoutes);
app.use('/blogs',blogRoutes);
app.get("/", (req, res) => {

    res.json({
        message: 'Welcome to the API'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})