import dotenv from "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./config/config.js";

connectDB()
.then(()=>{
    const port = PORT || 8000;
    app.listen(port, ()=>{
        console.log(`server running at port: ${port}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed ", err);
});