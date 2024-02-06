const jwt = require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
    try {
        const token=req.headers['authorization'].split(' ')[1]
        console.log(token);
        const jwtResponse = jwt.verify(token,process.env.SECRETKEY)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()        
        
    } catch (error) {
        res.status(408).json('Authorization failed.. Please Login!')
        
    }
}

module.exports = jwtMiddleware