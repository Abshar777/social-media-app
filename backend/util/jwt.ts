
import jwt from "jsonwebtoken"


export const generatToken=(userId:any)=>{
    const secret=process.env.JWT_SECRET || ""
    console.log(secret)
    const nodeEnv=process.env.NODE_ENV|| ""
    const token=jwt.sign({userId},secret,{
        expiresIn:"30d"
    })

   return token
}



