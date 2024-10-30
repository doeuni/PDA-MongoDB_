const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    console.log(req);
    res.send('Birds homepage');
})

router.get('/about',(req,res)=>{
    res.send('About birds')
})
//자료구조 배열이라 위에서부터 내려오면서 일치하는지 안하는지 보고. 대박. 
//배열은 순서가 정해져있는 데이터 
router.get('/:birdId', (req, res)=>{
    res.send(  `Hi, i asdfam ${req.params.birdId} 새입니다bird`)
})
//next는 다음미들웨어로 
router.get('/hi', (req, res)=>{
    res.send("Hi, i am bird")
})

//여기서 /bird/hi치면 4번에가는게아니라 순서대로 3번에 가서 3번이나옴. 
//난 4번이라고 생각함. 
module.exports = router;