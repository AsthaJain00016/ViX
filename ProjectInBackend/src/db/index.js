import mongoose from "mongoose";
import dns from "dns";
import { DB_NAME } from "../constants.js";
const connectDB=async()=>{
    try{
        dns.setServers(["8.8.8.8", "8.8.4.4"]);
        const connectionInstance=await mongoose.connect(process.env.MONGODB_URI, {
            dbName: DB_NAME
        })
        console.log(`\n MongoDB connected !! DB Host : ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("MongoDb connection failed", error);
        if (error.code === 'ECONNREFUSED' && error.syscall === 'querySrv') {
            console.log("DNS SRV lookup failed for MongoDB Atlas. If you are behind a restricted network, use a standard MongoDB URI from Atlas instead of mongodb+srv:// or switch your DNS to a public resolver.");
        }
        process.exit(1)
    }
}

export default connectDB;