/**
 * Server Configuration
 */
import express_  from "express"
import dotenv from "dotenv"
import connectDB from "./src/models/db.js";


const app = express_();
    

dotenv.config();
const PORT = process.env.PORT || 5010;
;

/**
 * Database connectivity
 */

connectDB()
.then(()=>{
     app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        });
})
.catch((error)=>console.log(error));

export default app;

