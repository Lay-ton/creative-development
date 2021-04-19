import { 
    create, 
    findAll,
    findAllType,
    findAllPublished,
    findOne,
    update,
    deleteOne,
    deleteAll,
} from "../controllers/product.controller.js";
import { Router } from "express";


export default (app) => {
    const router = Router(); 
    router.post("/", create);

    router.get("/", findAll);

    router.get("/published/:type", findAllPublished);
    
    router.get("/published", findAllPublished);

    router.get("/type/:type", findAllType);

    router.get("/:id", findOne);

    router.put("/:id", update);

    router.delete("/:id", deleteOne);

    router.delete("/", deleteAll);

    app.use('/api/products', router);
}