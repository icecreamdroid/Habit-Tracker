const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  User.create({...req.body,habit:[]})
    .then((newUser) => {
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "The User already exists Brotha, get some new details for me",
        error: err,
      });
    });
};

exports.logIn = async (req, res, next) => {
  console.log(req.body);
  User.findOne({
    contact_number: req.body.contact_number,
    password: req.body.password,
  })
    .select("name contact_number habits")
    .exec()
    .then((result) => {
      console.log(result);
      const token = jwt.sign({
        contact_number: result.contact_number,
        id:result._id
      },'fuckingjwt',{
        expiresIn:'24h'
      });
      res.status(200).send({
        data: {
          result,
          token,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        message:
          "The User Does not already exists Brotha, get some new details for me",
        error: err,
      });
    });
};
