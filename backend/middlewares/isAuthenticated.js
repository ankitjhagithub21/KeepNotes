const jwt = require('jsonwebtoken')
const isAuthenticated = async(req,res,next) =>{
    try{
      
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing."
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Token expired."
            })
        }
        req.userId = decoded.id;
        next()
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = isAuthenticated