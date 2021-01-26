const express = require("express");
const Expirience = require("../../database").Expirience;

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newExpirience = await Expirience.create(req.body);
        res.status(201).send(newExpirience);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
});

router.get("/", async (req, res) => {
    try {
        const allExpiriences = await Expirience.findAll({
            include: [Profile],
        });
        res.send(allExpiriences);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const singleExpirience = await Expirience.findByPk(req.params.id);
        res.send(singleExpirience);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Expirience.destroy({ where: { id: req.params.id } });
        res.send("Expirience destroyed");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
});

router.put("/:id", async (req, res) => {
    try {
        const alteredExpirience = await Expirience.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(alteredExpirience);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
});

module.exports = router;