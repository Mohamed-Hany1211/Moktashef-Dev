// modules imports
import mongoose from "mongoose";

const vulnsSchema = new mongoose.Schema({
    requestUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    vulnerabilities:[{
        description:{
            type:String,
            required:true,
            trim:true,
            lowercase: true
        },
        remediation:{
            type:String,
            required:true,
            trim:true
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        severity:{
            type:String,
            required:true,
            trim:true
        },
        learn_more_url:String
    }]
    
},{timestamps:true});




export default mongoose.models.Vulns || mongoose.model('Vulns',vulnsSchema);