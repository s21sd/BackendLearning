const mongoose = require("mongoose");

const todoSceama = new mongoose.Schema({

    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }

})

const Todo = mongoose.model('Todo',todoSceama);

module.exports=Todo;

// name:{
//     type:String,
// },
// age:{
//     type:Number,
//     min:18,
//     max:60
// },
// email:{
//     type:String,
//     unique:true,
// },
// password:{
//     type:String,
//     required:true  // If someone has forgot to provide the password in the frontened it will throught error
// },
// date:{
//     type:Date,
//     default:Date.now,
// },
