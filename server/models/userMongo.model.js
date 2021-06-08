import mongoose from 'mongoose'
import validator from 'validator'
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required:[true, 'Username is required'],
            unique: [true, 'Username already exists']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'This email has already been registered'],
            validate: (value) => {
                return validator.isEmail(value)
            }
        },
        password: {
            type:String,
            min: [8, 'Password cannot be less than 8 symbols'],
            required: [true, 'Password is required'],
        },
        updated: { type: Date, default: Date.now() },
        roles: {
            type:[String],
            enum:['Moderator', 'Admin', 'User']
        }
    });

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

export default User;