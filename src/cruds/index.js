const express = require("express");

const router = express.Router();
const profileRoute = require("./profile");
const postRoute = require("./posts");
const expRoute = require("./exp");
const commentRoute = require("./comments");

router.use("/profile", profileRoute);
router.use("/posts", postRoute);
router.use("/exp", expRoute);
router.use("/comments", commentRoute);
module.exports = router;