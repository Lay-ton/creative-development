import Auth from "../models/auth.js";
const auth = new Auth();

const signup = (req, res, next) => {
   auth.signup(req,res);
   //next();
}

const signin = (req, res, next) => {
    try {
        auth.signin(req, res);
    }catch(err) {
        throw new Error('Cannot sign in ' + err)
    }
    //next();
}

const signout = (req, res) => {

}

const controller = {
    signup,
    signin,
    signout,
}

export default controller;
