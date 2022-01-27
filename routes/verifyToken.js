const jwt = require('jsonwebtoken');

module.exports= function(req,res,next){
    const token = req.header('auth-token');
    if(!token)return res.status(401).json({error:"Access Denied"});

    try{
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        next();
    }catch(err){
            res.status(400).json({ error: "Invalid Token" });
    }
}

