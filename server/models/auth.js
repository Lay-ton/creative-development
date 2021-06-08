import bcrypt from "bcryptjs";
import db from '../models/index.js';
import redisConfig from '../configs/redis.config.js';
import jwt from 'jsonwebtoken';
import config from '../configs/auth.config.js';
const User = db.User;
const sessionStorage = db.sessionStorage;
import Model from '../core/types/model.js'

class Auth extends Model {
    constructor() {
        super()
        this.sessionStorage = sessionStorage
        console.log('SESSION STORAGE IN AUTH ' + this.sessionStorage);
    }

    signup(req, res) {
        // console.log(req.body);
        let user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,
            //roles: ['Admin', 'User']
        })
        user.save()
            .then(() => {
                res.send({
                    message: "User was registered successfully"
                })
            }).catch(err => {
                res.status(500).send({ message: err.message});
        });
    }

    signin(req, res) {
        User.findOne({username: req.body.username}
        ).then(user => {
            if (!user) {
                console.log('User not found')
                return res.status(404).send({ message: "User not found."});
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password,
            );

            if (!passwordIsValid) {
                console.log('Password not valid')
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password."
                });
            }
            //changed user.id to user._id as that is how it's stored in mongo
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            // assign sid to the current user using redis client
            const sid = this.sessionStorage.createSession(user)
                 .then(() => {
                    this.setCookie('sid', sid, new Date(new Date().getTime() * 1000 + redisConfig.sessionExpire));
                })
                .catch((err) => {
                    console.log('Error in setting a cookie')
                })

            let authorities = [];
            user.roles.forEach((role) => authorities.push("ROLE_" + role.toUpperCase()));
            delete req.body.password;

            res.status(200).send({
                _id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                body: -1,
                //Cookie: get cookie
            });
            //console.log(res);
            //});
        })
            .catch(err => {
            console.log(err);
            res.status(500).send({ message: err.message });
        });
    }

    signout(){

    }
}

export default Auth;