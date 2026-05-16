const mongoose = require("mongoose");
const { Schema } = mongoose;

const reactSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  type: {
    type: String,
    enum: ["Like", "Heart"],
  },
});
const reactModel = mongoose.model("reacts", reactSchema);
module.exports = reactModel;
