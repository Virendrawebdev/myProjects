import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import {config} from "../config/config.js"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    contact:{
        type:String,
        default:"",
    },
    role:{
        type:String,
        enum:["buyer", "seller"],
        default:"buyer",
    },
    avatar:{
        type:String,
        default:"",
    },
    refreshToken:{
        type:String,
        default:null,
    }

})

userSchema.pre("save", async function (){
    if(!this.isModified("password")){
        return;
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password= hash;
})

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken= async function(){
    return await jwt.sign({
        _id:this._id,
        email:this.email,
        role:this.role,
    },
    config.ACCESS_TOKEN_SECRET,
    {
        expiresIn:
        config.ACCESS_TOKEN_EXPIRY,
    }
);
};

userSchema.methods.generateRefreshToken= async function(){
    return await jwt.sign({
        _id:this._id,
    },
    config.REFRESH_TOKEN_SECRET,
    {
        expiresIn:
        config.REFRESH_TOKEN_EXPIRY,
    }
);
};



const userModel = mongoose.model('User', userSchema);
export default userModel;