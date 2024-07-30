const User = require("../models/user");
const bcrypt = require('bcryptjs')
const validator = require("email-validator");
const passwordValidator = require('password-validator');
const generateTokenAndSetCookie = require("../helpers/generateToken");

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exist."
            })
        }
        //name validation
        if(name.length<3){
            return res.status(400).json({
                success: false,
                message: "Name must be greater than 3 char."
            })
        }
        //Email validation
        const validEmail = validator.validate(email)

        if (!validEmail) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email."
            })

        }

        //password validation
        var schema = new passwordValidator();
        schema
            .is().min(8)                                    // Minimum length 8
            .is().max(100)                                  // Maximum length 100
            .has().uppercase()                              // Must have uppercase letters
            .has().lowercase()                              // Must have lowercase letters
            .has().digits(2)                                // Must have at least 2 digits
            .has().not().spaces()                           // Should not have spaces
         
        
        
        const validPassword = schema.validate(password)
        if(!validPassword){
            return res.status(400).json({
                success: false,
                message: "Password Validation failed."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })



        await newUser.save()


        generateTokenAndSetCookie(res,newUser._id)
        
        res.status(201).json({
            success:true,
            message:"Account created.",
            user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        let user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Wrong email or password."
            })
        }

        const comparePassword = await bcrypt.compare(password,user.password)

        if(!comparePassword){
            return res.status(404).json({
                success:false,
                message:"Wrong email or password."
            })
        }

        generateTokenAndSetCookie(res,user._id)
        
        user = {
            _id:user._id,
            name:user.name,
            email:user.email
        }

        res.status(200).json({
            success:true,
            message:`Welcome back ${user.name}`,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('token','',{
            maxAge:0
        }).json({
            success:true,
            message:"Logout successfully."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password")
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }

        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}