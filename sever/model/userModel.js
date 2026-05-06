const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true, min: 4 },
  password: { type: String, required: true, min: 8 },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
