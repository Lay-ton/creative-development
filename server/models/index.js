import User from './userMongo.model.js'
import Photo from './photoMongo.model.js'
import Product from './productMongo.model.js'
import RedisClient from "../configs/clients/redis.client.js";
import SessionStorage from "../core/storages/sessionStorage.js";
import MongoDB from "../configs/clients/mongo.client.js";
//import Auth from "./auth.js";

const db = {}

db.users = User;
db.photos = Photo;
db.products = Product;
db.connection = new MongoDB();
db.sessionStorage = new SessionStorage(new RedisClient())
console.log(db.sessionStorage)
//TODO: add relationships for photos->products
// TODO: possibly add connection of the database to db object
// db.connection = mongoose.connection?


// // Product.associate = (models) => {
// //     Product.hasOne(models.Photo, {as: "type"})
// // }
// db.photos.belongsTo(db.products, {foreignKey: 'productId'})
// db.products.hasOne(db.photos)

db.ROLES = ['User', 'Admin', 'Moderator'];

export default db;
//export const auth =  new Auth();
