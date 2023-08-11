const express = require("express");
const UserRoutes = require('./controllers/UserRoutes.js');  // importing the api to use
const cors = require("cors"); // use to connect the frontened and backend server
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// This is the one way 
// const allowOrigin=["http://localhost:3000","http://localhost:3001"]  // Lets assume that the first one is the frontened URL and second one is the backend Url we are going to connect
// app.use(cors({
//     origin: function (origin, callback) {
//         console.log("origin", origin);
//         if (!origin) return callback(null, true);
//         if (allowOrigin.include(origin)) return callback(null, true)
//         else {
//             return callback(new Error("Error in cors"));
//         }

//     }

// }))
// end😊

// This is the way to connect any url 
app.use(cors())



app.use('/userapis', UserRoutes)  //  now every api will called from here 
app.get('/', (req, res) => {
    res.send("HELLO THIS IS A DAY-1 TO LEARN THE EXPRESS");
})

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})