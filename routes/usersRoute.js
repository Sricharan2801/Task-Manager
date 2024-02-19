const express = require("express");
const userRegistartion = require("../controllers/userRegistration");
const userAuth = require("../controllers/userAuth");
const updateUserDetails = require("../controllers/updateUserDetails")
const router = express.Router();

router.post("/signUp",userRegistartion)
router.post("/signIn",userAuth)
router.patch("/:userId",updateUserDetails)

module.exports = router;