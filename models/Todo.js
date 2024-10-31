const mongoose=require('mongoose');

const TodoSchema = new mongoose.Schema({
    title : {type : String, required : true},
    content : {type: String, required: true},
    author : String,
    createdAt : {type: Date, default : Date.now},
})

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;