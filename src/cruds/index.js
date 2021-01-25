const express = require("express");

const router = express.Router();
const profileRoute = require("./profile");
const postRoute = require("./posts");
const expRoute = require("./exp");

router.use("/profile", profileRoute);
router.use("/posts", postRoute);
router.use("/exp", expRoute);
module.exports = router;