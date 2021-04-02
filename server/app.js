import express from "express";
import cors from "cors";

//My files
import db from './models/index.js';
import photography from './routes/product.routes.js';
import auth from './routes/auth.routes.js';
import user from './routes/user.routes.js';


const app = express();

// Uncomment the chunk below and run if you want to populate your roles table.
// Unless you force sync you can comment it back out after the
// first run.

// This drops and resets the tables
const Product = db.products
const Photo = db.photos
const Role = db.role;
db.connection.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    initial();
});
function initial() {
    Role.create({
        id: 1,
        name: 'user',
    });

    Role.create({
        id: 2,
        name: "moderator",
    });

    Role.create({
        id: 3,
        name: 'admin',
    })

    Product.create({
        title : "Blackfoot Mountain",
		description : "A about 7 miles into our hike towards Gunsight Pass in Glacier National Park, Montana. This shot is directed towards the mountains east of Gunsight Lake.",
		image : "0000809_0000809-R1-006-1A",
		published : true,
        typeTable : 'photo'
    })

    Photo.create({
        productId: 1,
        sizes: "12x12, 12x18, 18x20, 24x36",
        images: "0000809_0000809-R1-006-1A, 0000809_0000809-R1-006-1A"
    })
}

// db.connection.sync(); 

Product.findByPk(1, {attributes: ['id', 'typeTable']})
.then((company) => {
    // Get the Company with Users (employes) datas included
    console.log(company.dataValues['typeTable'])
    Product.findByPk(1, {include: company.dataValues['typeTable']})
    .then((data) => {
        console.log(data)
        console.log(data.photo)
    })
    // Get the Users (employes) records only
    // console.log(company.get().employes)
  })
  .catch((err) => {
    console.log("Error while find company : ", err)
  })



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
user(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

export default app;