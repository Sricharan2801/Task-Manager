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

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUserData = new User({ name, email, password: hashedPassword, confirmPassword: hashedPassword })

        try {
            const savedUser = await newUserData.save()

            const payLoad = {
                id: savedUser._id,
                email: savedUser.email
            }

            const secretKey = process.env.SECRET_KEY

            const token = jwt.sign(payLoad, secretKey, { expiresIn: "8h" })

            res.cookie("access_token", token).status(200).json({
                success: true,
                message: "User Registered Sucessfully",
                token: token
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                errorMessage: "Internal Server Error"
            })
        }


    } catch (error) {

    }
}

module.exports = userRegistartion;