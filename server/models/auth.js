import bcrypt from "bcryptjs";
import db from '../models/index.js';
import redisConfig from '../configs/redis.config.js';
import jwt from 'jsonwebtoken';
import config from '../configs/auth.config.js';
import Model from '../core/types/model.js'
import { v4 as uuidv4 } from 'uuid';

const User = db.user;
const sessionStorage = db.sessionStorage;

class Auth extends Model {

    async signup() {
        let user = new User({
            username: this.req.body.username,
            password: bcrypt.hashSync(this.req.body.password, 8),
            email: this.req.body.email,
            roles: this.req.body.roles,
        })
        await user.save()
        .then(() => {
            this.body = { message: "User was registered successfully" };
        }).catch(err => {
            this.body = { message: err.message }
            this.responseCode = 500;
        });
    }

    async signin() {
        await User.findOne({username: this.req.body.username}).then(user => {
            if (!user) {
                console.log('User not found')
                this.body = {message: "User not found."}
                this.responseCode = 404
            }

            let passwordIsValid = bcrypt.compareSync(
                this.req.body.password,
                user.password,
            );

            if (!passwordIsValid) {
                console.log('Password not valid')
                // return res.status(401).send({
                //     accessToken: null,
                //     message: "Invalid password."
                // });
            }
            return user;
            }).then(user => {
                //changed user.id to user._id as that is how it's stored in mongo
                let token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });


                let authorities = [];
                user.roles.forEach((role) => authorities.push("ROLE_" + role.toUpperCase()));

                //set body params
                delete this.req.body.password;
                this.body = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                }

                return sessionStorage.createSession(user);
            }).then(sessionId => {
                console.log(sessionId)
                this.setCookie('sid', sessionId, new Date(new Date().getTime() * 1000 + redisConfig.sessionExpire));
              })
              .catch(err => {
                console.log(err);
                this.body = { message: err.message }
                this.responseCode = 500
                //res.status(500).send({ message: err.message });
            });
    }

    signout(){

    }
}

export default Auth;