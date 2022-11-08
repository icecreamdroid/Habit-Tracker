var express = require("express");
var router = express.Router();
// utils
const checkAuth = require('../utils/check-auth');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
/* GET users listing. */
router.get("/", checkAuth, userController.getUserById);
router.post("/signup", authController.signup);
router.post('/login',authController.logIn)

module.exports = router;
