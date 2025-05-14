// modules imports
import mongoose from "mongoose";
// files imports
import { systemRoles } from "../../src/utils/system-roles.js";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minlength: 3,
        trim: true,
        unique: true,
        required:true
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
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isloggedIn: {
        type: Boolean,
        default: false
    },
    isAccountDeleted:{
        type: Boolean,
        default: false
    },
    userImg: {
        secure_url: { type: String},
        public_id: { type: String },
    },
    ResetPasswordOTP:{
        type:String,
        default:null
    },
    mediaFolderId:{
        type:String,
        default:null
    },
    role:{
        type: String,
        enum:[systemRoles.USER],
        default:systemRoles.USER
    },
    acceptTerms:{
        type:Boolean,
        default:false,
        required:true
    }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);