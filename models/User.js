const mongoose = require("mongoose");
const valiator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  contact_number: {
    type: Number,
    required: true,
    unique: true,
  },
  habit:{
    type:[mongoose.Schema.Types.ObjectId],
    unique:true,    
    ref:'Habit'
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    validate: [valiator.isEmail],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
