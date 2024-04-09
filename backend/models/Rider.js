const mongoose = require("mongoose");
const USER_ROLES = require("../constants/roles");

const riderSchema = new mongoose.Schema(
    {
        employeeid:{type:String,required:true},
        name:{type:String, required:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        role:{
            type:String,
            enum:Object.values(USER_ROLES),
            default:USER_ROLES.RIDER,
        },
        image: { type: String },
        address: { type: String },
        contact: { type: Number },
        rides: { 
                type: Number,
                default:0, },
        status:{type:String,
                default:"Available"},

    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Rider", riderSchema);