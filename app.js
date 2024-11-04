var createError = require('http-errors'); //require로 import
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 
// const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const birdsRouter = require('./routes/birds');
const commentRouter = require('./routes/comment')
const todoRouter = require('./routes/todo')
//localhost:3000 

const mongoose = require('./db')
var app = express();
// CORS 설정 추가. 매커니즘 찾아보기. 
//1.서버가 ok 2.브라우저가 나갈때에 5173으로 나가되 실제로 접속되는건 3000번. (프록시)
app.use(cors({
  origin: 'http://localhost:5173', //여기서 요청오면 허용해줄게. 
  credentials: true,
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization']
}));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// const express = require('express');
// const app = express();

// app.set('view engine', 'ejs'); // 템플릿 엔진을 ejs로 설정

app.use(logger('dev'));
// app.use(미들웨어 or 라우터)
app.use(express.json());//원래 body는 다 string인데 이걸 json으로 바꿔줌
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const session = require('express-session')
app.use(
  session({
    secret: process.env.SESSION_SECRET || "<my-secret>", //|| 연산자는 왼쪽 값이 falsy일 때 오른쪽 값을 반환
    resave : true,
    saveUninitialized : true,
    cookie : {
      httpOnly : true ,
      secure : false,
    },
  })
);
app.use(express.static(path.join(__dirname, 'public')));

//session 미들웨어 밑에서 사용가능 !! 
app.use((req, res, next)=>{
  // console.log("미들웨어",req.url) 
  
  if (!req.session.useHistory){
    req.session.useHistory = []
  } 
  req.session.useHistory.push(req.url)
  console.log("히스토리",req.session.useHistory)
  next()//다음 미들웨어로 보내는애
})
app.get('/hello-world',(req,res)=>{
  console.log(req.headers);
  res.json({
    title:'helloworld',
    data:'blah~~'
  })
})

app.post('/hello-world',(req,res)=>{
  // console.log(req);
  console.dir(req);
  res.send('this is post request');
})

app.put('/hello-world',(req,res)=>{
  console.log(req);
  res.send('this is put request');
});

app.delete('/hello-world',(req,res)=>{
  console.log(req);
  res.send('this is delete request');
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/board',boardRouter);
app.use('/comment',commentRouter);
app.use('/birds',birdsRouter);
app.use('/todo', todoRouter);
// catch 404 and forward to error handler
//import안하면 위에안들어가고 여기 url없으면 밑에 에러로들어감. (순서가중요)
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');//이게아니라 render라는건 주로 html로 주겟다는//
  res.json(res.locals) //이거 html이 아니라 json으로 .  . . .  .
});


module.exports = app;