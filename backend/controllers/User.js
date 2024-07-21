import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs'
import sendMail from "../middleware/sendmail.js";
//step-1 -> New user Registration 
//step-2 -> verify OTP
//step-3 -> Store user detail on DB

// New user Registration 
export const regiterUser = async (req , res) =>{
    try {
        console.log(req.body);
        const {name, email, password, contact} = req.body;
        let user = await User.findOne({email});
        //Code to check email address already exists
        if(user){
            return  res.status(400).json({
                    message: "Email already exist",
                 })
        }
        //Code to check encrypt the raw password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(Math.random() * 1000000)

        // create new user deatail obj
        user = {name, email, encryptedPassword, contact}

        //Create Signed activation token
        const activationToken = jwt.sign({user, otp}, process.env.ACTIVATION_CODE, {
            expiresIn: "5m"
        })
        const message = `Please verify your account using below OTP, <br> OTP: ${otp}`
        await sendMail(email, "Mail verification using nodemailer", message)
        return    res.status(200).json({
                    message: "Mail send successfully", activationToken, otp
                })
    } catch (error) {
        return res.status(500).json({
                message: error.message,
        })
        
    }
}

// Verify OTP and store the detail on DB
export const verifyUser = async (req, res) =>{
    try {
        const {otp, activationToken } = req.body;
        const verify = jwt.verify(activationToken, process.env.ACTIVATION_CODE);
        if (!verify) {
            return res.json({
            message: "Otp Expired",
            });
        }

        if (verify.otp !== otp) {
            return res.json({
            message: "Wrong Otp",
            });
        }

        // Storing on DB
        await User.create({ // User is a model got from models/User.js
            name: verify.user.name,
            email: verify.user.email,
            password: verify.user.encryptedPassword,
            contact: verify.user.contact,
        });
        return res.status(200).json({
                    message: "User Registration Success",
        });
    } catch (error) {
        return  res.status(500).json({
                    message: error.message
        })
    }
}

export const loginUser= async (req, res) =>{
    try {
        const {email, password} = req.body;

        //Check user email
        const user = User.findOne({email});
        if(!user){
            return  res.status(400).json({
                message: "Invalid credential"
            })
        }

        //Check password

        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword){
            return  res.status(400).json({
                message: "Invalid credential"
            })
        }
    } catch (error) {
        return  res.status(500).json({
            message: error.message
        })
    }
}