const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

let PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
    default: () => new Date().toString(),
    // default: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
  },
  created_by: {
    type: String,
    required: true,
  },
});

PostSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Post", PostSchema);
