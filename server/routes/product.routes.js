import { 
    create, 
    findAll,
    findAllType,
    getTypes,
    findAllPublished,
    findOne,
    update,
    deleteOne,
} from "../controllers/product.controller.js";
import { Router } from "express";


export default (app) => {
    const router = Router(); 
    router.post("/", create);

    router.get("/", findAll);

    router.get("/published/:type", findAllPublished);
    
    router.get("/published", findAllPublished);

    router.get("/types", getTypes);

    router.get("/type/:type", findAllType);

    router.get("/:id", findOne);

    router.post("/:id", update);

    router.delete("/:id", deleteOne);

    app.use('/api/products', router);
}