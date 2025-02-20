// modules imports
import mongoose from "mongoose";

const vulnsSchema = new mongoose.Schema({
    vulnType:{
        type:String,
        required:true,
        trim:true,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    riskLevel:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    remediation:{
        type:String,
        required:true,
        trim:true
    },
    learnMore:String
},{timestamps:true});




export default mongoose.models.Vulns || mongoose.model('Vulns',vulnsSchema);