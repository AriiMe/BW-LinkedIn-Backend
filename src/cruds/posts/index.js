const express = require("express");
const Posts = require("../../database").Posts; //BECAUSE DATABASE/INDEX.JS IS EXPORTING A MODELS OBJECT, WE CAN CALL THE Review MODEL STRAIGHT FROM THIS OBJECT
const Profiles = require("../../database").Profiles;

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
        const newPost = await Posts.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
        res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.get("/", async (req, res) => {
    try {
        const allPosts = await Posts.findAll({
            include: [Profiles],
        }); //.findAll RETURNS ALL OF THE ReviewS
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singlePost = await Posts.findByPk(req.params.id, {
            include: [Profiles],
        }); //.findByPk RETURNS THE Post WITH THE MATCHING ID
        res.send(singlePost);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Posts.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
        res.send("post destroyed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const alteredPost = await Posts.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(alteredPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});


router.post("/:id/upload", cloudinaryMulter.single("ProstImage"), async (req, res) => {
    try {
        const alteredPost = await Posts.update({ imgurl: req.file.path }, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(alteredProst);
    } catch (error) {
        console.log(error);
        res.status(500).send("Uh oh, something broke :(");
    }
});

module.exports = router;