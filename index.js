import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import upload from "./middleware/multer.js";
//importing all the routes

import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";

dotenv.config({
    path:"./config.env",
})
const app = express();

app.use(express.json());
app.use(cookieParser());


app.post("/api/upload",upload.single("file"),function(req,res){
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);


const port = process.env.PORT || 8800;

app.listen(port,()=>{
    console.log(`connected to the server at port ${port}`);
}).catch((error)=>{
    console.log("could not connect to database because of the error",error);
    process.exit(1);
})



