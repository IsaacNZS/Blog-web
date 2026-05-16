const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const { saveimg } = require("../utils/galary");

router.post("/registor", controller.registor);
router.post("/login", controller.login);
router.get("/profile", controller.all);
router.post("/logout", controller.out);
router.post("/post/:id", saveimg, controller.crepost);
router.put("/posts-edit/:id", saveimg, controller.editpost);
router.delete("/posts-edit/:id", controller.deletepost);
router.get("/posts", controller.showallposts);
router.get("/posts-edit/:id", controller.old);
router.get("/myitem/:name", controller.myitems);
router.get("/allusers", controller.alluser);
router.get("/finduser/:name", controller.finduser);
router.post("/react/user/:userid/post/:postid", controller.react);

module.exports = router;
