const User = require("../models/Users");
const bcrypt = require("bcrypt");

const updateUserDetails = async (req, res) => {
    try {
        const { name, password, newPassword } = req.body;
        const userId =  req.headers["userId"]

        // getting olf password
        const oldPassword = await User.findOne({ _id: userId })
        console.log(oldPassword);

        // hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // comparing old password with provided password
        const comparePassword = await bcrypt.compare(password, oldPassword.password)

        try {

            if (comparePassword) {
                await User.updateOne({ _id: userId }, {
                    $set: { name, password: hashedPassword }
                });

                res.status(200).json({
                    success: true,
                    message: "Updated Successfully"
                })
            } else {
                res.status(401).json({
                    success: false,
                    errorMessage: "old password is incorrect"
                })
            }
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