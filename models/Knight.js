const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const knightSchema = new Schema({
  num: {
    type: Number,
    required: true,
  },
  cid : {
    type: String,
    required: true,
  },
});
const Knight = mongoose.model("Knight", knightSchema);
module.exports = Knight;
