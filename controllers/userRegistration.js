const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistartion = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body

        // handles if data passed is empty
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad Request"
            })
        }

        // checking wheather user already exist or not
        const isEmailExist = await User.findOne({ email: email })
        if (isEmailExist) {
            return res.status(409).json({
                success: false,
                errorMessage: "Email already exist"
            })
        }

        // check password and confirmPassword mustbe same
        if (password != confirmPassword) {
            return res.status(409).json({
                success: false,
                errorMessage: "password and confirm-password should be same"
            })
        }

        // hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // creating new set of data
        const newUserData = new User({ name, email, password: hashedPassword, confirmPassword: hashedPassword })

        try {
            const savedUser = await newUserData.save()

            const payLoad = {
                id: savedUser._id,
                email: savedUser.email
            }

            // Generating token for Autherization
            const secretKey = process.env.SECRET_KEY
            const token = jwt.sign(payLoad, secretKey)

            // saving token in cookie 
            res.cookie("access_token", token).status(200).json({
                success: true,
                message: "User Registered Sucessfully",
                token: token,
                userName: newUserData.name
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                errorMessage: "Error In User Registration"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

module.exports = userRegistartion;