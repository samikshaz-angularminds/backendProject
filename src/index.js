import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// this is giving an error
// dotenv.config({path:"../env"})
dotenv.config();

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR HAS OCCURED LISTENING TO APP: ",error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server running on port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongodb connection has been failed.. ",err);
})







/*
import express from "express";
const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("ERROR: ",error);
            throw error; 
        });
        app.listen(process.env.PORT, ()=>{
            console.log(`App listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ",error);
        throw error;
    }
})()
*/