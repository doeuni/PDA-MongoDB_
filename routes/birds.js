const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    console.log(req);
    res.send('Birds homepage');
})

router.get('/about',(req,res)=>{
    res.send('About birds')
})

module.exports = router;