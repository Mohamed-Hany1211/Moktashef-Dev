// modules imports
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        trim: true,
        required:true
    },
    lastName: {
        type: String,
        minlength: 3,
        trim: true,
        required:true
    },
    userName: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isloggedIn: {
        type: Boolean,
        default: false
    },
    userImg: {
        secure_url: { type: String},
        public_id: { type: String, unique: true }
    },
    ResetPasswordOTP:{
        type:String,
        default:null
    },
    mediaFolderId:{
        type:String,
        default:null
    }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);