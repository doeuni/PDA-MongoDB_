var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo');
const {createToken, verifyToken} = require('../utils/auth')//추가

router.post("/", authenticate, async (req, res, next)=> { //로그인되어있는애만돼야하니까 authenticate함수넣엇
    Todo.create(req.body).then(todo => {
        console.log(req.body)
        res.json(todo)
    }).catch(err=>{
        next(err)
    })
})

router.get("/", async(req, res, next)=>{
    Todo.find().then(todo=>{
       console.log(todo)
        res.json(todo)
    })
})

async function authenticate(req, res, next) {
    let token = req.cookies.authToken;
    let headerToken = req.headers.authorization;
    if (!token && headerToken) {
      token = headerToken.split(" ")[1];
    }
  
    const user = verifyToken(token);
    req.user = user;
  
    if (!user) {
      const error = new Error("Authorization Failed");
      error.status = 403;
  
      next(error);
    }
    next();
  }



module.exports = router;