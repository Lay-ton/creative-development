import Sequelize from 'sequelize';

//My Files
import dbConfig from '../configs/db.config.js'
import Product from './product.model.js';
import Photo from './photo.model.js';
import Role from './role.model.js';
import User from './user.model.js';

const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

// Establish tables
db.products = Product(connection, Sequelize);
db.photos = Photo(connection, Sequelize);
db.role = Role(connection, Sequelize);
db.user = User(connection, Sequelize);

// Establish relationship
db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'roleId',
});
db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
});

// Product.associate = (models) => {
//     Product.hasOne(models.Photo, {as: "type"})
// }
db.photos.belongsTo(db.products, {foreignKey: 'productId'})
db.products.hasOne(db.photos)


db.ROLES = ['user', 'admin', 'moderator'];

export default db;