const express = require("express");

const router = express.Router();
const profileRoute = require("./profile");
const postRoute = require("./post");
const expRoute = require("./exp");

router.use("/profile", profileRoute);
router.use("/post", postRoute);
router.use("/exp", expRoute);
module.exports = router;