const User = require("../models/Users");
const bcrypt = require("bcrypt");

const updateUserDetails = async (req, res) => {
    try {
        const { name, password, confirmPassword } = req.body;
        const userId = req.params.userId

        // check for password & confirmPassword 
        if (password != confirmPassword) {
            return res.status(409).json({
                success: false,
                errorMessage: "password and confirm-password should be same"
            })
        }
        
        // hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            await User.updateOne({ _id: userId }, {
                $set: { name, password: hashedPassword, confirmPassword: hashedPassword }
            });

            res.status(200).json({
                success: true,
                message: "Updated Successfully"
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                errorMessage: "Error in updating user Details"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }

}

module.exports = updateUserDetails;