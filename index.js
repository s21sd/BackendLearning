const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const todoRoutes = require('./ROUTES/TodoRoutes')
require('./db');
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());
app.use('/todoRoutes', todoRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Api is working"
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})