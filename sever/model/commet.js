const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  text: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;
