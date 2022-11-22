const schedule = require("node-schedule");
const UserModel = require("../models/User");
const HabitModel = require("../models/Habits");
const LogModel = require("../models/Log");
const { update } = require("../models/Log");

const job = schedule.scheduleJob("0 0 0 * * *", (date) => {
  updateLogs();
});

updateLogs = async () => {
  var userArray = await UserModel.find({});
  // const newHabitDoc = await HabitModel.create(HabitDocTemplate);
  // for(let i=0)
  for (const user of userArray) {
    const logDoc = await LogModel.create({
      habit: user.habit[0],
      amount: 0,
    });
    var habitDoc = await HabitModel.findById(user.habit);
    habitDoc.log.push(logDoc._id);
    const updatedHabitDoc = await habitDoc.save();
    var userDoc = await UserModel.findById(user._id);
    userDoc.habit.push(updatedHabitDoc._id);
    const updatedUserDoc = await userDoc.save();
    console.log(updatedUserDoc);
  }
};

module.exports = job;
