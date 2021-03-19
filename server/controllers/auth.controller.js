import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// My Files
import db from '../models/index';
import config from '../configs/auth.config';

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        // Sets Roles to whatever roles are specified in request.
        // Will get rid of this later because using burp you could alter the
        // request and give yourself admin role. Should make assigning admin
        // something done by existing admins or through direct sql access.
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: "User was registered successfully."
                    });
                });
            });
        } else {
            // Sets role to User if no roles are present
            user.setRoles([1]).then(() => {
                res.send({
                    message: "User was registered successfully."
                });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message});
    });
};

const signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User not found."});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password,
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password."
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

export default {
    signup,
    signin,
}