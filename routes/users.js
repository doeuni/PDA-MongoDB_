// 1. TodoSchema 만들기
// 2. 로그인한 유저만 TodoSchema를 작성할 수 있게 만들기(API 및 라우터 만들기)
// 3. react에서 로그인 구현하고, TodoList 기능 구현하기.


var express = require('express');
var router = express.Router();
var User = require('../models/User');
const {createToken, verifyToken} = require('../utils/auth')//추가
/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.viewCount){
    console.log("리퀘스트",req)
    req.session.viewCount +=1;
  } else {
    req.session.viewCount = 1
  }

  // console.log("뷰카운트", req.session.viewCount);
  // console.log(req.session)
  res.send('respond a resource');
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.signUp(email, password);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const tokenMaxAge = 60 * 60 * 24 * 3;

    const token = createToken(user, tokenMaxAge); //utils에있었따.

    user.token = token;//유저객체에 토큰추가

    //1. 토큰을 쿠키에 저장하라고 reponse header에 담아보낸다. 1,2 둘중하나만하면됨
    res.cookie("authToken", token, {
      httpOnly: true,//js에서접근못하게
      maxAge: tokenMaxAge * 1000,
      secure : false
    });

    console.log(user);
    //2. token을 reponse body에 담아보낸다. 
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});
router.all("/logout", async (req, res, next) => { //all:모든메소드 다 적용된다
  try {
      res.cookie("authToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(204).send()
  } catch (err) {
    console.error(err);
    res.status(400);
    next(err);
  }
});

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
router.get("/protected", authenticate, async (req, res, next) => {
  console.log(req.user);
  res.json({ data: "민감한 데이터" });
});



module.exports = router;
