const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
    default: () => new Date().toString(),
    // default: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
  },
});

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = mongoose.model("User", UserSchema);
