const express = require("express");
const Expirience = require("../../database").Expirience;
const Profile = require("../../database").Profile
const json2csv = require("json2csv").parse;

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

//CSV

router.get("/:profileId/:expId/downloadcsv", async (req, res) => {
    const experience = await Experience.find({
        profileId: req.params.profileId,
    });
    const fields = [
        "id",
        "role",
        "company",
        "startdate",
        "enddate",
        "description",
        "area",
        "imgurl",
    ];
    const data = { fields };
    const csvString = json2csv(experience, data);
    res.setHeader(
        "Content-disposition",
        "attachment; filename=shifts-report.csv"
    );
    res.set("Content-Type", "text/csv");
    res.status(200).send(csvString);
})

module.exports = router;