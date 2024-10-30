var express = require('express');
var router = express.Router();

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

module.exports = router;
