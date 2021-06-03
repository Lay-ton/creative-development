import mongoose from "mongoose";
import auth from './auth.config.js'
class MongoDB {
    constructor() {
        this.PREFIX = 'mongodb+srv://';
        this.MONGO_USER = auth.user;
        this.MONGO_PWD = auth.password;
        this.DB = 'test'
        this.HOST = 'cluster0.qy5oi.mongodb.net/';
        this.URI = this.PREFIX+this.MONGO_USER+':'+this.MONGO_PWD+'@'+this.HOST+this.DB;
        this._init();
    }

    async _init() {
        await mongoose.connect(this.URI,
            {
                useNewUrlParser: true, useUnifiedTopology: true
            }) .then(() => {
                console.log('Database connection successful')
              })
              .catch(err => {
                console.error('Database connection error')
              })
    }

}

export default MongoDB