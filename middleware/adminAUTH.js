import jwt from 'jsonwebtoken'


export const adminAuth =(req,res,next)=>{
try {
    const {token} = req.headers
    if (!token) {
        return res.send({success : false , message :" first Not Authorized Login Again"})
    }
    
    const token_decode = jwt.verify(token,process.env.TOKEN_ADMIN)
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.send({success : false , message :"second Not Authorized Login Again"})
    }
    next()
} catch (error) {
    console.log(error.message);
        return res.send({success : false , message : error.message})

    
}

}