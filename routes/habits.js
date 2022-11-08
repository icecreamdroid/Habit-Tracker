const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");
const checkAuth = require("../utils/check-auth");

router.get("/", checkAuth, habitController.getHabit);
router.post("/add", checkAuth, habitController.addHabit);
router.patch("/update", checkAuth, habitController.updateHabit);
module.exports = router;
