const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  des: { type: String, required: true },
  time: { type: Date, default: Date.now },
  author: {
    type: String,
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
