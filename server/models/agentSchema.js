//importing the mongoose library
const mongoose = require("mongoose");
//creating the schema
const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String
});

module.exports = mongoose.model("Agent", agentSchema);