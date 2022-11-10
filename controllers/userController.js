const mongoose = require("mongoose");
const User = require("../models/User");

exports.getUserById = async (req, res, next) => {
  console.log(req.query);
  User.findById(req.userId)
    .select("name contact_number habit")
    .exec()
    .then((user) => {
      res.status(200).json({
        user,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "user not found bruh",
        error: err,
      });
    });
};

