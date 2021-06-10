import User from './userMongo.model.js'
import Photo from './photoMongo.model.js'
import Product from './productMongo.model.js'
import RedisClient from "../configs/clients/redis.client.js";
import SessionStorage from "../core/storages/sessionStorage.js";
import MongoDB from "../configs/clients/mongo.client.js";
//import Auth from "./auth.js";

const db = {}

db.user = User;
db.photo = Photo;
db.product = Product;


db.ROLES = ['User', 'Admin', 'Moderator'];


db.connection = new MongoDB();

db.sessionStorage = new SessionStorage(new RedisClient())



// const getCollection = (name ) => {
//     for (const [key, value] of Object.entries(db)) {
//         console.log(`Type of ${key} is ${typeof key}, and type of ${value} is ${typeof value}`)
//     }
// }
//
// getCollection('Photo')





export default db;
//export const auth =  new Auth();
