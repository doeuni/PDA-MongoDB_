const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');


router.get('/', (req, res, next)=>{
    Comment.find().then(comments=>{//find뒤조건안줫으니전체
        res.json(comments)//res를 json형태로바꿔서.
    }).catch(err=>{
        next(err)
    })
})

// router.get('/:id', (req, res, next)=>{
//     // url에 /:id (콜론으로 시작하는 문자열은 parameters)
//     // ==> req.params로 해당하는 문자열에 접근할 수 있다.
//     // 만약 /:id/reviews/:reviewId
//     // ==> req.params = {id: <입력내용1>, reviewId: <입력내용2>}
    
//     console.log(req.params);
//     // Board.findById(req.param.id).then(board=>{
//     Comment.findById(req.params.id).then(comment=>{
//         res.json(comment);
//     }).catch(err=>{
//         next(err);
//     })
// });
//body에넣을 스펙 우리가 정의했음. 
// router.post('/', (req, res, next)=>{
//     console.log(req.body);
//     Comment.create(req.body).then(comment=>{
//         res.json(comment)
//     }).catch(err=>{
//         next(err)
//     })
// })

//수정
router.put('/:id',(req, res, next)=>{
    console.log(req.body);
    // Comment.findByIdAndUpdate()
    Comment.updateOne(req.body).then(comment=>{
        res.json(comment)
    }).catch(err=>{
        next(err)
    })
}) 

//삭제
router.delete('/:id', (req, res, next)=>{
    console.log(req.body);
    Comment.deleteOne(req.body).then(comment=>{
        res.json(comment)

    }).catch(err=>{
        next(err)
    })
})
//deleteOne(<조건>) : 하나삭제
// Cat.deleteOne({name: "민지"}).then(data=>{
//     console.log(data);
// })


// Cat.updateOne({name: "냐옹이"}, {name: "13242"}).then(data => {
//     console.log(data);
// })
module.exports = router;