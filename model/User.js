const mongoose =require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:25
    },
    email:{
        type:String,
        required:true,
        max:225,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    }

})

module.exports = mongoose.model('User',userSchema);