var jwt = require('jsonwebtoken');
const JWT_SECRET = "Iamagoodbou";

const fetchUser=(req, res, next)=>{
    //Get user from the jwt token and aa it to the req object
    const token=req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Please enter a valid token"});

    }
    const data= jwt.verify(token, JWT_SECRET);
    req.user=data.user;
    next();
}