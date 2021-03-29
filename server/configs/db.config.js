const databases = {
  "development": {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "",
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
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "",
    DB: "sealyoulater_test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
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