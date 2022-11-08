const { ObjectID } = require("bson");
const { log } = require("debug/src/node");
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const LogModel = mongoose.model('Log',logSchema);

module.exports = LogModel;