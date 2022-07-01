const { timeStamp } = require('console');
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required: [true, 'please provide a task title']
    },
    description:{
        type:String,
        required: [true, 'please task provide a title']
    }
},
{
    timestamps:true 
})

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;