import mongoose from "mongoose";


//Schema is reffers to DB table, Now We have to create table and its columns 
/*
Name
Email
Password
Role
Contact
*/
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "user",
    },
    contact:{
        type: String,
        required: true,
    },
}, {timestamps: true});

export const User = mongoose.model("User", schema); // We have to export as a mongoose model
