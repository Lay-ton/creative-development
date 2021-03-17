import express from "express";
import cors from "cors";

const app = express();
import db from './models/index.js';

// This reset and drop the table
// db.connection.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

db.connection.sync().then(() => {
    console.log("Drop and re-sync db.");
});

var corsOptions = {
    origin: 'http://localhost:5000'
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to my site"});
});

import photography from "./routes/photography.routes.js";
photography(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});