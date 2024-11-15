
import jwt from "jsonwebtoken"


export const generatToken=(userId:any)=>{
    const secret=process.env.JWT_SECRET || ""
    const token=jwt.sign({userId},secret,{
        expiresIn:"30d"
    })

   return token
}



