const router =require('express').Router();
const varify= require('./verfyToken')

router.get('/',varify,(req,res)=>{
    res.json({posts:{title:'first post',discription:'rendom data you dont have access' }});

});


module.exports =router;