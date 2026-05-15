const usersDB = require("../model/userModel");
const postDB = require("../model/postModel");
const { Encoder } = require("../utils/core");
const JWT = require("jsonwebtoken");

const registor = async (req, res, next) => {
  try {
    let name = req.body.name;
    let nawmalpass = req.body.password;
    let password = Encoder.encode(nawmalpass);
    let username = await usersDB.findOne({ name });
    if (username) {
      return res.status(400).json({
        con: false,
        msg: "User Name is Already Has Been Used!",
      });
    }
    await new usersDB({ name, password }).save();
    res.status(200).json({
      con: true,
      msg: "You Successfully Registered! PLease Login",
      result: req.body,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    let name = req.body.name;
    let password = req.body.password;
    let username = await usersDB.findOne({ name });
    if (!username) {
      res.status(400).json({
        con: false,
        msg: "UserName or Password is wrong!",
      });
      return;
    }
    let userpassword = await Encoder.compare(password, username.password);
    if (!userpassword) {
      res.status(400).json({
        con: false,
        msg: "UserName or Password is wrong!",
      });
      return;
    }
    const token = JWT.sign(
      { id: username._id, name: username.name },
      process.env.SCREAT_KEY,
      {
        expiresIn: "3d",
      },
    );
    res.cookie("token", token, {
      secure: true,
      path: "/",
      httpOnly: true,
      sameSite: "none",
    });
    res.status(200).json({
      con: true,
      msg: "You Successfully logined!",
      id: username.id,
      name: username.name,
    });
  } catch (error) {
    console.log(error);
  }
};

const all = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        msg: "No token found",
      });
    }

    JWT.verify(token, process.env.SCREAT_KEY, (err, info) => {
      if (err) {
        return res.status(401).json({
          msg: "Invalid token",
        });
      }
      let user = usersDB.findById(info.id);
      res.json(info);
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const out = (req, res, next) => {
  res.cookie("token", "").json({ msg: "Logout Succefully!" });
};

const crepost = async (req, res) => {
  let userinfo = await usersDB.findById(req.params.id);
  let data = JSON.parse(req.body.data);
  req.body.title = data.title;
  req.body.des = data.des;
  req.body.author = userinfo.name;
  req.body.img = req.img;
  let posts = await new postDB(req.body).save();
  if (posts) {
    res.status(200).json({
      con: true,
      msg: "Your Post Successfully Created!",
    });
  } else {
    res.status(401).json({
      con: false,
      msg: "Sorry Fail To Create Post!",
    });
  }
};

const showallposts = async (req, res) => {
  const allposts = await postDB.find().sort({ time: -1 });
  res.status(200).json({ con: true, msg: "All posts", result: allposts });
};

const old = async (req, res) => {
  const olddata = await postDB.findById(req.params.id);
  res.status(200).json({ con: true, msg: "Old data", result: olddata });
};

const editpost = async (req, res) => {
  try {
    let data = JSON.parse(req.body.data);

    const updatedPost = await postDB.findByIdAndUpdate(
      req.params.id,
      {
        title: data.title,
        des: data.des,
        img: req.img,
      },
      { new: true },
    );

    if (updatedPost) {
      res.status(200).json({
        con: true,
        msg: "Your Post Successfully Edited!",
        result: updatedPost,
      });
    } else {
      res.status(404).json({
        con: false,
        msg: "Post not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

const deletepost = async (req, res) => {
  try {
    const deletedPost = await postDB.findByIdAndDelete(req.params.id);

    if (deletedPost) {
      res.status(200).json({
        con: true,
        msg: "Your Post Successfully Deleted!",
      });
    } else {
      res.status(404).json({
        con: false,
        msg: "Post not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      con: false,
      msg: "Server error",
    });
  }
};

const myitems = async (req, res) => {
  let name = req.params.name;
  const myposts = await postDB.find({ author: name }).sort({ time: -1 });
  res.status(200).json({ con: true, msg: "My posts", result: myposts });
};

const alluser = async (req, res) => {
  const allusers = await usersDB.find();
  const allposts = await postDB.find().sort({ time: -1 });

  const result = allusers.map((user) => {
    const profile = allposts.find(
      (p) =>
        p.author === user.name &&
        (p.title === "PROFILE" ||
          p.title === "Profile" ||
          p.title === "profile"),
    );
    return {
      ...user._doc,
      img: profile?.img || null,
    };
  });
  res.status(200).json({
    con: true,
    msg: "All users",
    result: result,
  });
};

const finduser = async (req, res) => {
  const name = req.params.name;

  const users = await usersDB.find({
    name: { $regex: name, $options: "i" },
  });

  if (!users.length) {
    return res.status(404).json({
      con: false,
      msg: "User not found",
    });
  }

  const result = await Promise.all(
    users.map(async (user) => {
      const userPosts = await postDB
        .find({ author: user.name })
        .sort({ time: -1 });

      const profile = userPosts.find(
        (p) =>
          p.author === user.name &&
          ["PROFILE", "Profile", "profile"].includes(p.title),
      );

      return {
        ...user._doc,
        img: profile?.img || null,
      };
    }),
  );

  res.status(200).json({
    con: true,
    msg: "Users found",
    result,
  });
};

module.exports = {
  registor,
  login,
  all,
  out,
  crepost,
  showallposts,
  old,
  editpost,
  deletepost,
  myitems,
  alluser,
  finduser,
};
