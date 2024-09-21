/**
 * Server Configuration
 */
import mongoose_ from "mongoose"
import express_  from "express"
import dotenv from "dotenv"


const app = express_();
    

dotenv.config();
const PORT = process.env.PORT || 5010;
const MONDGO_uRL = process.env.MONGODB_url;

/**
 * Database connectivity
 */
mongoose_
.connect(MONDGO_uRL)
.then(()=>{
        console.log("db connection successfull.")
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
})
.catch((error)=>console.log(error));

export default app;

