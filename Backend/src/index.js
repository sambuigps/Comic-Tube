import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
.then(()=>{
    const port = process.env.PORT || 8000;
    app.listen(port, ()=>{
        console.log(`server running at port: ${port}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed ", err);
});