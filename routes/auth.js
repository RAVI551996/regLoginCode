const router =require('express').Router();
// const bcrypt = require('bcryptjs/dist/bcrypt');
const User =require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation,loginValidation } = require('../validation')




router.post('/register',async (req, res)=>{

    // Confirm Password
    const isConfirmed  = req.body.password.localeCompare(req.body.confirmPassword);
    if(isConfirmed != 0)
    return res.status(400).send("Password Doesn't match. Please re-enter password.");

    //Let validate the data before we make a user
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // checking if the user is already in the data base
    const emailExist =await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email is already exists');

    //Hash passwords
    const salt =await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    

    //create new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try{
        const savedUser = await user.save();
        var token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
        res.status(200).json({
            name:req.body.name,
            email:req.body.email,
            id: user._id,
            token:jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
        });
         //create and assign token
     
        
    }catch(err){
        res.status(400).send(err);
    }
 }); 


//login
router.post('/login',async (req,res)=>{
    //Let validate the data before we make a user
   
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   
        // checking if the email exist
        const user =await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send('Email not found');
        //password is correct
        const validPass = await bcrypt.compare(req.body.password,user.password);
        if(!validPass)return res.status(400).send('Invalid password');

       
        //create and assign token
       
        res.status(200).json({
            email:req.body.email,
            id: user._id,
            token:jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
        }); 

        // res.send('Logged in!');
});

module.exports =router;

