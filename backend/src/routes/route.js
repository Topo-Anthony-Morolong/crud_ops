import express from "express"

import {create,update,deleteBook,fetchAll,} from "../controllers/bookController.js"

const route = express.Router();

route.post("/create", create);
route.get("/allBooks",fetchAll);
route.put("/update/:id",update);
route.delete("/delete/:id",deleteBook);

export default route;
