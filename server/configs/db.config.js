const databases = {
  "development": {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "root",
    DB: "sealyoulater_dev",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  "test": {
    HOST: "cluster0.qy5oi.mongodb.net/",
    USER: "mongo",
    PASSWORD: "mongoroot",
    DB: "test",
  },
  "production": {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "",
    DB: "sealyoulater_prod",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
};

export default databases[process.env.NODE_ENV];