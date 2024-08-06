const express = require("express");
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
const searchUser = require("../controller/searchUser");

const router = express.Router();

router.post("/register", registerUser);
router.post("/checkemail", checkEmail);
router.post("/checkpassword", checkPassword);
router.get("/userdetails", userDetails);
router.get("/logout", logout);
router.post("/updateuser", updateUserDetails);
router.post("/searchuser", searchUser);

module.exports = router;
