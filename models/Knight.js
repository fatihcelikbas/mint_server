const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const knightSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  attributes: [{
    trait_type: String,
    value: String
  }],
  cid : {
    type: String,
    required: true,
  },
  isMinted: {
    type: Boolean,
    default: false
  }, 
});
const Knight = mongoose.model("Knight", knightSchema);
module.exports = Knight;
