import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// My Files
import db from '../models/index.js';
import config from '../configs/auth.config.js';

const User = db.users;


const signup = (req, res) => {
    // console.log(req.body);
    let user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
    })
    user.save()
        .then(() => {
        res.send({
            message: "User was registered successfully"
        })
        }).catch(err => {
            res.status(500).send({ message: err.message});
        });
};

const signin = (req, res) => {

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

        let authorities = [];
        user.roles.forEach(role => authorities.push("ROLE_" + role.toUpperCase()));
        //TODO
        delete req.body.password;

        res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            body: -1,
        });
        console.log(res);
        // });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: err.message });
    });
};

export default {
    signup,
    signin,
}