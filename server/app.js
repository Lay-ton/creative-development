import express from "express";
import cors from "cors" ;

import mongoose from 'mongoose'
//My files
import db from './models/index.js';
import photography from './routes/product.routes.js';
import auth from './routes/auth.routes.js';
import user from './routes/user.routes.js';
import MongoDB from "./configs/mongo.config.js";


const app = express();
db.connection = new MongoDB();

const Product = db.products;
const Photo = db.photos;
const User = db.users;

// db.connection.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// });
// function initial() {
//
// }

// db.connection.sync(); 




var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to my site"});
});

photography(app);
auth(app);
//user(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

export default app;