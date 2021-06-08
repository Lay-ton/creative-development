import express from "express";
import cors from "cors" ;

import mongoose from 'mongoose'
//My files
import db from './models/index.js';
import photography from './routes/product.routes.js';
import auth from './routes/auth.routes.js';
import bcrypt from "bcryptjs";

const app = express();
const User = db.User;
const Product = db.Product;
const Photo = db.Photo;
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

/**--------------DEV DEBUG OPTION------------*/

if (process.env.NODE_ENV === "development") {
    User.deleteMany()
    .then(()=>{
        let user = new User({
            username: "devTestUser",
            password: bcrypt.hashSync("DevTestUser123", 8),
            email: "dev@testuser.com",
            roles: ['Admin', 'User']
        })
        user.save();
    })
    Product.deleteMany()
    .then(() => {
        let product = new Product({
            title: "Blackfoot Mountain",
            description: "A about 7 miles into our hike towards Gunsight Pass in Glacier National Park, Montana. This shot is directed towards the mountains east of Gunsight Lake.",
            published: true,
            typeTable: "Photo",
            image: "0000809_0000809-R1-006-1A",
        })
        product.save()
        .then((data) => {
            Photo.deleteMany()
            .then(() => {
                let photo = new Photo({
                    productId: data._id,
                    sizes: ["12x12", "12x18", "18x20", "24x36"],
                    prices: ["$20.00", "$25.00", "$30.00", "$35.00"],
                    images: []
                })
                photo.save()
            })
        })
    })
}

/*--------------------------------------------*/

const PORT = process.env.PORT || 5000;
// db.sessionStorage.init()
    //.then((conn) => {

        console.log('<-----------Session storage has been initialized----------->');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });

    // }).catch((err) => {
    // throw new Error('Error in init:\n' + err)
//})







export default app;