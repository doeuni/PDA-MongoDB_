const express = require('express');
const router = express.Router();

const Board = require('../models/Board');
const Comment = require('../models/Comment')



router.get('/', (req, res, next)=>{
    Board.find().then(boards=>{//find뒤조건안줫으니전체
        res.cookie("my-cookie", "cookie-value",//key value값. 
            {
            maxAge: 100 * 60 * 60 * 24,
            secure :false,// http's'일떄만 request에 담아 전송하는 쿠키
            httpOnly : true,
            signed : false,//쿠키 자체를 암호화
            
        }); 
        console.log(req)
        // console.log('모든 쿠키:', req.cookies);//요청에 담아서 쿠키를보내니까? req.
        // console.log('특정 쿠키:', req.cookies['my-cookie']);

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


   // url에 /:id (콜론으로 시작하는 문자열은 parameters)
    // ==> req.params로 해당하는 문자열에 접근할 수 있다.
    // 만약 /:id/reviews/:reviewId
    // ==> req.params = {id: <입력내용1>, reviewId: <입력내용2>}
const BOARD_HISTORY_COOKIE = 'board-history';

router.get('/:id', (req, res, next)=>{
    // Board.findById(req.param.id).then(board=>{
    Board.findById(req.params.id).then(board=>{
        console.log(board)
        if (req.session.boardPath){

        } else {
            req.session.boardPath= []
        }
        req.session.boardPath.push(board.title)
        if (req.session.boardPath.length > 10){
            req.session.boardPath.shift();
        }
        console.log(req.session.boardPath)
        // let boardHistory = req.cookies[BOARD_HISTORY_COOKIE];
        // if (boardHistory){
        //     boardHistory = JSON.parse(boardHistory);
        // }else{
        //     boardHistory = []
        // }

        // console.log(boardHistory);
        
        // boardHistory.push(req.params.id);
        // if (boardHistory.length > 3){
        //     boardHistory.shift();
        // }
        // res.cookie(BOARD_HISTORY_COOKIE, JSON.stringify(boardHistory), {
        //     secure:true
        // })
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
    console.log("리퀘스트", req);
    console.log("리퀘스트.바디",req.body);
    //댓글 생성이 완료되면 .then이후 실행됨
    Comment.create(req.body).then(comment=>{
        console.log("코멘트", comment)
        res.json(comment)
    }).catch(err=>{
        next(err)
    })
    
    // console.log("코멘트",Comment) // 데이터베이스모델
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