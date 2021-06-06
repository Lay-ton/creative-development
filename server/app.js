import express from "express";
import cors from "cors" ;

import mongoose from 'mongoose'
//My files
import db from './models/index.js';
import photography from './routes/product.routes.js';
import auth from './routes/auth.routes.js';
import bcrypt from "bcryptjs";

const app = express();
const User = db.users;
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
    db.users.deleteMany()
        .then(()=>{
            let user = new User({
                username: "devTestUser",
                password: bcrypt.hashSync("DevTestUser123", 8),
                email: "dev@testuser.com",
                roles: ['Admin', 'User']
            })
            user.save()
        })
}
/**--------------------------------------------*/



const PORT = process.env.PORT || 5000;
db.sessionStorage.init()
    .then((conn) => {

        console.log('<-----------Session storage has been initialized----------->');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });

    }).catch((err) => {
    throw new Error('Error in init:\n' + err)
})







export default app;