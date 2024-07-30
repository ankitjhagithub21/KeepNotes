const jwt = require('jsonwebtoken')
const generateTokenAndSetCookie = async(res,userId) =>{
    try{    

        const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:1*24*60*60*1000
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = generateTokenAndSetCookie