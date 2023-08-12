const express = require("express");
const bodyParser = require("body-parser");
const Todo = require('../MODELS/Todo')
const router = express.Router();
router.use(bodyParser.json());


router.get('/test', (req, res) => {
    res.json({
        message: "The Todo api is woking"
    })
});

// To create TODO
router.post('/createtodo', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description
        })
        await newTodo.save();
        res.status(201).json({
            message: "Todo created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Some error occcured"
        })
    }

})
// To get all the TODO
router.get('/getalltodos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            todos,
            message: "Todos got successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Some error occcured"
        })
    }
})

// TO get todo with id from todo
router.get('/getalltodos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            res.status(404).json({
                message: "error not found"
            })
        }
        res.status(200).json({
            todo,
            message: 'Todo Fetched Successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: "Some error occcured"
        })
    }
})

// Put method to update the things

router.put('/updatetodo/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const todo = await Todo.findByIdAndUpdate(req.params.id, {
            title,
            description,
            completed
        }, {
            new: true    // this is the method to update the feild
        });
        if (!todo) {
            res.status(404).json({
                message: "error not found"
            })
        }
        res.status(200).json({
            todo,
            message: 'Todo updated Successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: "Some error occcured"
        })
    }
})

router.delete('/deletetodo/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)

        if (!todo) {
            res.status(404).json({
                message: "error! not found"
            })
        }
        res.status(200).json({

            message: 'Todo deleted Successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: "Some error occcured"
        })
    }
})

module.exports = router;