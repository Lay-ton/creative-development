import Auth from "../models/auth.js";
import methodExecutor from '../core/methodExecutor.js';


const signup = async (req, res, next) => {
  await methodExecutor(new Auth(req), "signup", res)
  next();
}

const signin = async (req, res, next) => {
  await methodExecutor(new Auth(req), "signin", res)
  next();
}

const signout = (req, res) => {

}

const controller = {
    signup,
    signin,
    signout,
}

export default controller;
