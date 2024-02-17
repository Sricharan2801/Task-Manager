const express = require("express");
const userRegistartion = require("../controllers/userRegistration");
const userAuth = require("../controllers/userAuth")
const router = express.Router();

router.post("/signUp",userRegistartion)
router.post("/signIn",userAuth)

module.exports = router;