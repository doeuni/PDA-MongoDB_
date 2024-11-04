var express = require('express');
const router = express.Router();
var Todo = require('../models/Todo');
const {authenticate} = require('../utils/auth')//추가

router.post("/", authenticate, async (req, res, next)=> { //로그인되어있는애만돼야하니까 authenticate함수넣엇
    Todo.create(req.body).then(todo => {
        console.log(req.body)
        res.json(todo)//이렇게 response에 주면 postman 응답이나 프론트에서 연결했을 때 확인할 수 o
    }).catch(err=>{
        next(err)
    })
})

router.get("/", async(req, res, next)=>{
    Todo.find().then(todo=>{
       console.log(todo)
        res.json(todo)//
    })
})

router.put("/:id", async(req, res, next)=> {
  Todo.updateOne(req.body).then(todo=>{
    res.json(todo)
    console.log(todo)
  }).catch(err=>{
    next(err)
  })
})

router.delete("/:id", (req, res, next)=> {
  Todo.deleteOne(req.body).then(todo=>{
    res.json(todo)
  }).catch(err=>{
    next(err)
  })
})

module.exports = router;