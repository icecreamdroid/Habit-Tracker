const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const HabitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Habit must have a name']
    },
    unit:{
        type:String,
        required:[true,'habit must have a measurement unit']
    },
    log:{
        type : [mongoose.Schema.Types.ObjectId],
        ref:'Log'
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'provide a user for the habit'],
        ref:'User'
    }
});

const HabitModel = mongoose.model("Habit",HabitSchema);
module.exports = HabitModel;