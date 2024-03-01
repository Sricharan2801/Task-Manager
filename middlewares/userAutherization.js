const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = await req.headers["authorization"];
        

        // when token is empty
        if (!token) return res.status(401).json({
            success: false,
            errrorMessage: "Token Not Found"
        });

        const secretKey = process.env.SECRET_KEY;
        const verifiedToken = jwt.verify(token, secretKey);
        console.log(verifiedToken.id);

        if (verifiedToken) {
            req.user = verifiedToken;
            req.body.id = verifiedToken.id;
            next()
        } else {
            res.status(401).josn({
                success: false,
                errorMessage: "Invalid Token"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            errorMessage: "Internal Server Error"
        })
    }
}

module.exports = verifyToken;
