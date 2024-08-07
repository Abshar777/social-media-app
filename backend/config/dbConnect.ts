import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const uri=process.env.MONGODB_URI || " "
        const connect =await mongoose.connect(uri);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    }catch(err){
        console.log("when conneting on mongodb error-  "+(err as Error).message);
        process.exit()
    }
}

export default connectDb;