import app from "./server.js"
import bodyParser from "body-parser"
import route from "./src/routes/route.js"
import cors from "cors"

/** Middlewere */
    app.use(bodyParser.json());
    app.use(cors());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        next();
    });
    
    app.use(cors({
        origin: "http://localhost:3000",
        methods:  ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));

    /**Routes */ 
    app.use("/api/Book",route);

/**Error Handling */
    app.use((error,req,res,next)=>{
        console.error(error);
        res.status(500).send("Internal Server Error");
    });