const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token){
        res.status(500).send("fuck you there no token")
    }
    else{
        jwt.verify(token,'fuckingjwt',(err,decoded)=>{
            if(err){
                res.status(500).send("fuck you for something else",err)
            }
            else req.userId = decoded.id;
            next();
        })
    }
}