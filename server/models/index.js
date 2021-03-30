import Sequelize from 'sequelize';
import { Client } from 'pg';

//My Files
import dbConfig from '../configs/db.config.js'
import Photography from './photography.model.js';
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
db.photography = Photography(connection, Sequelize);
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

db.ROLES = ['user', 'admin', 'moderator'];

export default db;