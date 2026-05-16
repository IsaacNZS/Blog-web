const reactDB = require("../model/reaction");
const usersDB = require("../model/userModel");
const postDB = require("../model/postModel");

const allreact = async (req, res) => {
  try {
    const postId = req.params.id;

    const reacts = await reactDB.find({ postId }).populate("userId");

    res.status(200).json({
      con: true,
      msg: "Reacts found",
      result: reacts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

const postreact = async (req, res) => {
  try {
    const postId = req.params.postid;
    const userId = req.params.userid;
    const { type } = req.body;

    await reactDB({ postId, userId, type }).save();

    res.status(200).json({
      con: true,
      msg: "react added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

const deletereact = async (req, res) => {
  try {
    const comId = req.params.id;
    await reactDB.findByIdAndDelete(comId);

    res.status(200).json({
      con: true,
      msg: "React Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

module.exports = {
  allreact,
  postreact,
  deletereact,
};
