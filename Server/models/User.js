import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        lastName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        email:{
            type:String,
            required:true,
            max:50,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            min:5,
        },
        picturePath:{
            type:String,
            default:""
        },
        firends:{
            type:Array,
            default:[]
        },
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number,
    },{timestamps: true});

    // timestamps: true this gives us dates for when its created and updated

    const User= mongoose.model("User",UserSchema);
    export default User;