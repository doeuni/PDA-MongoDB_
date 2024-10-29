const mongoose = require('../db');

const CommentSchema = new mongoose.Schema({
    title : {type : String, required : true},
    content : {type: String, required: true},
    board : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : "Board"
    },
    author : String,
    createdAt : {type: Date, default : Date.now},
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment