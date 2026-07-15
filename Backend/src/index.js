import dotenv from "dotenv";

dotenv.config();

// console.log(result);
console.log(process.env.CORS_ORIGIN);
import connectDB from "./db/index.js";
import { app } from "./app.js";

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