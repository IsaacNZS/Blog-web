const express = require("express");
const router = express.Router();
const controller = require("../controller/reactContoller");

router.post("/user/:userid/post/:postid", controller.postreact);
router.get("/post/:id", controller.allreact);
router.delete("/delete/:id", controller.deletereact);

module.exports = router;
