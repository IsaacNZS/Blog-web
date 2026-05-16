const express = require("express");
const router = express.Router();
const controller = require("../controller/commentController");

router.post("/user/:userid/post/:postid", controller.postcomment);
router.get("/post/:id", controller.allcomments);
router.delete("/delete/:id", controller.deletecom);
router.patch("/edit/:id", controller.editcom);

module.exports = router;
