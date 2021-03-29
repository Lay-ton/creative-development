import express from "express";
import cors from "cors";

//My files
import db from './models/index.js';
import photography from './routes/photography.routes.js';
import auth from './routes/auth.routes.js';
import user from './routes/user.routes.js';


const app = express();

// console.log("Testing");
// This drops and resets the tables
// db.connection.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
db.connection.sync();

// Uncomment and run if you want to populate your roles table.
// Unless your force sync you can comment it back out after the
// first run.
// const Role = db.role;
// function initial() {
//     Role.create({
//         id: 1,
//         name: 'user',
//     });

//     Role.create({
//         id: 2,
//         name: "moderator",
//     });

//     Role.create({
//         id: 3,
//         name: 'admin',
//     })
// }
// initial();

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