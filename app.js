var createError = require('http-errors'); //require로 import
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const birdsRouter = require('./routes/birds');
const commentRouter = require('./routes/comment')
//localhost:3000 

const mongoose = require('./db')
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// const express = require('express');
// const app = express();

// app.set('view engine', 'ejs'); // 템플릿 엔진을 ejs로 설정

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/board',boardRouter);
app.use('/comment',commentRouter);
app.use('/birds',birdsRouter)
// catch 404 and forward to error handler
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
  // res.render('error');
  res.json(res.locals) //이거 추가 
});

module.exports = app;