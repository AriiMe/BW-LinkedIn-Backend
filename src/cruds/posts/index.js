const express = require("express");
const Post = require("../../database").Post;
const Profile = require("../../database").Profile;
const multer = require("multer");
const cloudinary = require("../../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "samples",
    },
});
const cloudinaryMulter = multer({ storage: storage });

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create(req.body); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
        res.status(201).send(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/", async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [Profile],
        }); //.findAll RETURNS ALL OF THE Posts
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
            include: [Profile],
        }); //.findByPk RETURNS THE Post WITH THE MATCHING ID
        res.send(singlePost);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Post.destroy({ where: { id: req.params.id } }); //.destroy DESTROYS ROWS. CAN DESTROY MULTIPLE BASED ON FILTER. WILL DESTRY ALL WITHOUT A FILTER
        res.send("post destroyed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const alteredPosts = await Post.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(alteredPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.post(
    "/:id/upload",
    cloudinaryMulter.single("ProstImage"),
    async (req, res) => {
        try {
            const alteredPost = await Post.update(
                { imgurl: req.file.path },
                {
                    where: { id: req.params.id },
                    returning: true,
                }
            );
            res.send(alteredProst);
        } catch (error) {
            console.log(error);
            res.status(500).send("Something went bad!");
        }
    }
);

module.exports = router;
