const express = require("express");
const Post = require("../../database").Post;
const Comment = require("../../database").Comment;
const Like = require("../../database").Like;


const router = express.Router();

router.post("/:profileId/:elementId", async (req, res) => {
    try {
        const newLike = await Like.create({ profileId: req.params.profileId, elementId: req.params.elementId }); //.create IS A SEQUELIZE METHOD DOR MODELS, IT CREATES A NEW ROW IN THE TABLE
        res.status(201).send(newLike);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});



router.get("/:id/comments", async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id)
        const likes = comment.getLikes()
        res.send(likes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.get("/:id/posts", async (req, res) => {
    try {
        const singleComment = await Like.findByPk(req.params.id, {
            include: [Post, Profile],
        });
        res.send(singleComment);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Like.destroy({ where: { id: req.params.id } });
        res.send("comment destroyed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went bad!");
    }
});




module.exports = router;