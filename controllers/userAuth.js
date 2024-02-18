const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userAuth = async (req, res) => {
    try {
        const { email, password } = req.body

        // handles if data passed is empty
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad Request"
            })
        }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {

            const comparePassword = await bcrypt.compare(password, isUserExist.password);

            if (comparePassword) {

                const payLoad = {
                    id: isUserExist._id,
                    email: isUserExist.email
                }

                const secretKey = process.env.SECRET_KEY

                const token = jwt.sign(payLoad, secretKey, { expiresIn: "8h" })

                res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    userName: isUserExist.name,
                    token: token
                })
            } else {
                res.status(401).json({
                    success: false,
                    errorMessage: "Incorrect Password"
                })
            }

        } else {
            res.status(404).json({
                success: false,
                errorMessage: "User Not Found"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

module.exports = userAuth