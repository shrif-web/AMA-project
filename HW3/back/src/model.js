const mongoose = require("mongoose");


let employee = new mongoose.Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    location: {
      type: String
    }
  },
  { collection: "Employees" }
);

module.exports = mongoose.model("employees", employee);