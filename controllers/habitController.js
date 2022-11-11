const HabitModel = require("../models/Habits");
const UserModel = require("../models/User");
const LogModel = require("../models/Log");

exports.addHabit = async (req, res, next) => {
  const HabitDocTemplate = {
    name: req.body.habit_name,
    unit: req.body.unit,
    users: req.userId,
    log: [],
  };
  var newHabitDoc = await HabitModel.create(HabitDocTemplate);
  const logDoc = await LogModel.create({
    habit: newHabitDoc._id,
    amount: 0,
  });
  newHabitDoc.log.push(logDoc._id);
  console.log(newHabitDoc);
  const updatedHabitDoc = await HabitModel.findByIdAndUpdate(
    newHabitDoc._id,
    newHabitDoc,
    { returnDocument: "after" }
  );
  console.log(updatedHabitDoc);
  const userDoc = await UserModel.findOne({ _id: req.userId });
  console.log(userDoc);
  userDoc.habit.push(newHabitDoc._id);
  userDoc.save();
  res.status(200).json({
    status: "success",
    data: {
      habit: updatedHabitDoc,
      user: userDoc,
    },
  });
};

exports.getHabit = async (req, res, next) => {
  console.log(req.query);
  HabitModel.findOne({ _id: req.query.habit_id })
    .populate("users log")
    .exec()
    .then((result) => {
      res.status(200).json({
        data: result,
      });
    })
    .catch((e) => {
      res.status(404).json({
        msg: "something fucking wrong happened here",
        error: e,
      });
    });
};
exports.updateHabit = async (req, res, next) => {
  console.log(req.body);
  const updatedProps = { amount: req.body.amount };
  HabitModel.findOne({
    _id: req.body.habit_id,
  })
    .exec()
    .then((result) => {
      if ("log" in result) {
        LogModel.findByIdAndUpdate(result.log[result.log.length-1], updatedProps, {
          new: true,
        }).then((response) => {
          console.log(response);
          HabitModel.findById(req.body.habit_id)
            .populate("log")
            .exec()
            .then((result) => {
              res.status(200).json({
                result,
              });
            });
        });
      } else {
        LogModel.create({
          habit: req.body.habit_id,
          amount: 0,
        })
          .then((response) => {
            res.status(200).json({
              response,
            });
          })
          .catch((e) => {
            res.status(400).json({
              err: e,
              msg: "something got fucked",
            });
          });
      }
    })
    .catch((e) => console.log(e));
};

exports.addCigarettes = async (habit_name, unit, userId) => {
  const HabitDocTemplate = {
    name: habit_name,
    unit: unit,
    users: userId,
    log: [],
  };
  try {
    const newHabitDoc = await HabitModel.create(HabitDocTemplate);
    const logDoc = await LogModel.create({
      habit: newHabitDoc._id,
      amount: 0,
    });
    newHabitDoc.log.push(logDoc._id);
    console.log(newHabitDoc);
    const updatedHabitDoc = await HabitModel.findByIdAndUpdate(
      newHabitDoc._id,
      newHabitDoc,
      { returnDocument: "after" }
    );
    console.log(updatedHabitDoc);
    const userDoc = await UserModel.findOne({ _id: userId });
    console.log(userDoc);
    userDoc.habit.push(newHabitDoc._id);
    userDoc.save();
    res.status(200).json({
      status: "success",
      data: {
        habit: updatedHabitDoc,
        user: userDoc,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
