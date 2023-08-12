// It is just a basic express file
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");  // this is for to connect backend and fronntened server
const Port = 5000;
require('dotenv').config();
const app = express();

const db = require("./db");  // Impoting the database file to use

const Todo = require("./Model/Todo");
const Register = require("./Model/Register");

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'API IS WOKING FINE' });
    // res.send('API WOKRS');
})

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    const { id } = req.body;
    // console.log('token', token);

    if (!token) {
        return res.status(401).json({ message: "Auth Error" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (id && decoded.id !== id) {
            return res.status(401).json({ message: "MY Auth Error" });
        }
        req.id = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Invalid Token" });
    }
}
app.get('/gettodos', async (req, res) => {    // this api is just to get the todo
    const alltodos = await Todo.find();
    res.json(alltodos);
})

// Register API
app.post('/register', async (req, res) => {
    try {
        const { name, password, email, age, gender } = req.body;
        const emailExist = await Register.findOne({ email }); // check for user existence
        if (emailExist) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const myhashedPass = await bcrypt.hash(password, salt);
        const newUser = new Register({
            name,
            password: myhashedPass,
            email,
            age,
            gender
        })

        await newUser.save();
        res.status(201).json({
            message: "New User Created Successfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Login API 
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Register.findOne({ email }); // check for user existence
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid Credential" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            token,
            message: "User logged in successfully"
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/getmyprofile', authenticateToken, async (req, res) => {
    const { id } = req.body;
    const user = await Register.findById(id);
    res.status(200).json({ user });
})
app.post('/addtodos', async (req, res) => {   // got the back response from the body

    const { task, completed } = req.body;
    const todo = new Todo({
        task,
        completed
    })
    const saveTodo = await todo.save();
    res.json({
        message: "Todo Saved",
        saveTodo: saveTodo
    })
});

// APlying filter to get the data
app.post('/getgender', async (req, res) => {
    const { gender } = req.body;
    const user = await Register.find({ gender: gender });
    res.status(200).json({ user });


})
app.listen(Port, () => {
    console.log(`Server is running on the port ${Port}`);
})

// token ->eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzhlYmVmM2U5Y2Y3ZmYzYzM5YjRiMiIsImlhdCI6MTY5MDg5OTk2MX0.lQRBQFDfXV2yxIyOlL9DJSXwt86VSgeZ1I45FQfXtns