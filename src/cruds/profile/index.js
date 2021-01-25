const express = require("express");
const Profiles = require("../../database").Profile; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE Article MODEL STRAIGHT FROM THIS OBJECT
const Posts = require("../../database").Posts;
const Expier = require("../../database").EXPIER;
const multer = require("multer")

const cloudinary = require("../../cloudinary")
const { CloudinaryStorage } = require("multer-storage-cloudinary")


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "samples"
    }
})
const cloudinaryMulter = multer({ storage: storage })

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newProfile = await Profiles.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
        res.status(201).send(newProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.get("/", async (req, res) => {
    try {
        const allProfiles = await Profiles.findAll({
            include: [Posts, Expier],
        }); //.findAll RETURNS ALL OF THE ArticleS. include:[] IS AN ARRAY THAT CONNECTS MODELS WITH THE REQUEST. THIS IS DONE SO AUTHORID CAN GET THE CORRESPONDING AUTHOR OBJECT
        res.send(allProfiles);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singleProfile = await Profiles.findByPk(req.params.id, {
            include: [Posts, Expier],
        }); //.findByPk RETURNS THE Article WITH THE MATCHING ID
        res.send(singleProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Profiles.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
        res.send("profile destroyed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const alteredProfile = await Profiles.update(req.body, {
            where: { id: req.params.id },
            include: [Posts, Expier],
            returning: true,
        });
        res.send(alteredProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.post("/:id/upload", cloudinaryMulter.single("ProfileImage"), async (req, res) => {
    try {
        const alteredProfile = await Profiles.update({ imgurl: req.file.path }, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(alteredProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

module.exports = router;