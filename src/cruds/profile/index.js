const express = require("express");
const Profile = require("../../database").Profile; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE Article MODEL STRAIGHT FROM THIS OBJECT
const Post = require("../../database").Post;
const Expirience = require("../../database").Expirience;
const Comment = require("../../database").Comment;
const multer = require("multer");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const cloudinary = require("../../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const authenticate = require("../../auth");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "samples",
  },
});
const cloudinaryMulter = multer({ storage: storage });

const router = express.Router();

router.post("/login", async (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the profile array by username and password
  const profile = Profile.findOne({
    where: { username: username, password: password },
  });

  if (profile) {
    // Generate an access token
    const accessToken = jwt.sign(
      { id: profile.id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});
router.post("/", async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE

    res.status(201).send(newProfile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const allProfiles = await Profile.findAll({
      include: [Post, Expirience, Comment],
    }); //.findAll RETURNS ALL OF THE ArticleS. include:[] IS AN ARRAY THAT CONNECTS MODELS WITH THE REQUEST. THIS IS DONE SO AUTHORID CAN GET THE CORRESPONDING AUTHOR OBJECT
    res.send(allProfiles);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    if (req.profile.id === "me") {
      res.send(req.profile);
    } else {
      const singleProfile = await Profile.findByPk(req.params.id, {
        include: [Post, Expirience, Comment],
      }); //.findByPk RETURNS THE Article WITH THE MATCHING ID
      res.send(singleProfile);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Profile.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
    res.send("profile destroyed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    if (req.profile.id === req.params.id) {
      const alteredProfile = await Profile.update(req.body, {
        where: { id: req.params.id },
        include: [Post, Expirience],
        returning: true,
      });
      res.send(alteredProfile);
    } else {
      res.status(401).send("unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

router.post(
  "/:id/upload",
  authenticate,
  cloudinaryMulter.single("ProfileImage"),
  async (req, res) => {
    try {
      const alteredProfile = await Profile.update(
        { imgurl: req.file.path },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );
      res.send(alteredProfile);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong!");
    }
  }
);

module.exports = router;
