
import Sequelize from 'sequelize';
import mysql from 'mysql';

//My Files
import dbConfig from '../configs/db.config.js'
import Photography from './photography.model.js';
import Role from './role.model.js';
import User from './user.model.js';


// Creates the database if needed based on what the NODE_ENV var is set to, then disconnects
const initialize = mysql.createConnection({ host: dbConfig.HOST, user: dbConfig.USER, password: dbConfig.PASSWORD});
initialize.connect(function(err) {
    if (err) throw err;
    console.log("Connected...");
    initialize.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`, function (err, result) {
      if (err) throw err;
      console.log(`Database created or already exists! (DB: ${dbConfig.DB})`);
    });
    initialize.end();
  });


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