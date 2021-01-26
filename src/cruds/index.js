const express = require("express");

const router = express.Router();
const profileRoute = require("./profile");
const postRoute = require("./posts");
const expRoute = require("./exp");
const commentRoute = require("./comments");
const likeRoute = require("./like");

router.use("/profile", profileRoute);
router.use("/posts", postRoute);
router.use("/exp", expRoute);
router.use("/comments", commentRoute);
router.use("/like", likeRoute);
module.exports = router;