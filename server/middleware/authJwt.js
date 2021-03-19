import jwt from 'jsonwebtoken';
import config from '../configs/db.config';
import db from '../models/index';
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No taken provided"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requires Admin Role"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requires Moderator Role"
            });
            return;
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator') {
                    next();
                    return;
                }

                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requires Admin or Mod Role"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isAdmin,
    isModeratorOrAdmin: isModeratorOrAdmin,
};
export default authJwt;