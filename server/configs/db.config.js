const databases = {
  "development": {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "sealyoulater_dev",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  "test": {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "sealyoulater_test",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  "production": {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "sealyoulater_prod",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
};

export default databases[process.env.NODE_ENV];