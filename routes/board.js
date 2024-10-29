const express = require('express');
const router = express.Router();

const Board = require('../models/Board');
const Comment = require('../models/Comment')

router.get('/', (req, res, next)=>{
    Board.find().then(boards=>{//find뒤조건안줫으니전체
        res.json(boards)//res를 json형태로바꿔서.
    }).catch(err=>{
        next(err)
    })
})

// https://search.naver.com/search.naver?query=무역전쟁&where=news
// https:            <Protocol>
// search.naver.com  <Host, Domain>
// /search.naver     <Path>
// ?query=무역전쟁&where=news 
// <Parameter, QueryParameter, QueryString, QuerySet

router.get('/:id', (req, res, next)=>{
    // url에 /:id (콜론으로 시작하는 문자열은 parameters)
    // ==> req.params로 해당하는 문자열에 접근할 수 있다.
    // 만약 /:id/reviews/:reviewId
    // ==> req.params = {id: <입력내용1>, reviewId: <입력내용2>}
    
    console.log(req.params);
    // Board.findById(req.param.id).then(board=>{
    Board.findById(req.params.id).then(board=>{
        res.json(board);
    }).catch(err=>{
        next(err);
    })
});
//body에넣을 스펙 우리가 정의했음. 
router.post('/', (req, res, next)=>{
    console.log(req.body);
    Board.create(req.body).then(board=>{
        res.json(board)
    }).catch(err=>{
        next(err)
    })
})

router.post('/:id/comment', (req, res, next)=>{
    console.log(req.body);
    Comment.create(req.body).then(comment=>{
        res.json(comment)
    }).catch(err=>{
        next(err)
    })
})

router.get('/:id/comment', (req, res, next)=>{
    // url에 /:id (콜론으로 시작하는 문자열은 parameters)
    // ==> req.params로 해당하는 문자열에 접근할 수 있다.
    // 만약 /:id/reviews/:reviewId
    // ==> req.params = {id: <입력내용1>, reviewId: <입력내용2>}
    
    console.log(req.params);
    // Board.findById(req.param.id).then(board=>{
    Comment.find({board : req.params.id}).then(comment=>{
        //findById 말고 FIND로 하고 보드뒤 조건을 ID
        //params.id가 :id로 받은 값!
        res.json(comment);
    }).catch(err=>{
        next(err);
    })
});

//수정
// Cat.updateOne({name: "냐옹이"}, {name: "13242"}).then(data => {
//     console.log(data);
// })



module.exports = router;