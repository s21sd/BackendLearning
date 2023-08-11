const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
// we have to export this file cause app.js does not know about it
const fs = require("fs");  // this is for the file system
const path = require("path") // this is for the path

const dataFilePath = path.join(__dirname, '../UserDatabase.json'); // this is the mathod to find the file 

const getFileData = () => {
    const data = fs.readFileSync(dataFilePath); // for reading the file and simple return
    return JSON.parse(data);
}

function writeFileData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
}
// Method to call an external api
router.get('/users', (req, res) => {
    const apiData = getFileData();
    res.send(apiData);
})
// Method to call api's specific item
router.get('/users/:id', (req, res) => {
    const users = getFileData();
    const userId = req.params.id;
    const user = users.find(user => user.id == parseInt(userId));
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send({
            error: 'user not found'
        });


    }

})


router.get('/test', (req, res) => {
    res.send(

        {
            Msg: "Welcome to the user api",
            path: dataFilePath
        }

    );
})

// For the Post API
router.post('/users', (req, res) => {
    const user = req.body;
    const users = getFileData();
    user.id = new Date().getTime();
    console.log('user', user);
    // user.push(users); // Store the new data in the database

    res.send('ok');
    // writeFileData(user)
})
module.exports = router;