const usersDB = require("../model/userModel");
const postDB = require("../model/postModel");
const commentDB = require("../model/commet");

const allcomments = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await commentDB
      .find({ postId })
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      con: true,
      msg: "Comments found",
      result: comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

const postcomment = async (req, res) => {
  try {
    const postId = req.params.postid;
    const userId = req.params.userid;
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        con: false,
        msg: "Comment text is required",
      });
    }

    await commentDB({ postId, userId, text }).save();

    res.status(200).json({
      con: true,
      msg: "Comment added successfully",
    });
  } catch (err) {
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

const deletecom = async (req, res) => {
  try {
    const comId = req.params.id;
    await commentDB.findByIdAndDelete(comId);

    res.status(200).json({
      con: true,
      msg: "Comment Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

const editcom = async (req, res) => {
  try {
    const comId = req.params.id;
    const { text } = req.body;
    await commentDB.findByIdAndUpdate(comId, { text: text });
    res.status(200).json({
      con: true,
      msg: "Comment Edited successfully",
    });
  } catch (err) {
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

module.exports = {
  allcomments,
  postcomment,
  deletecom,
  editcom,
};
