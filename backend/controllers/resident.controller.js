const express = require("express");

const Resident = require("../models/resident.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    let resident = await Resident.create(req.body);

    return res.status(201).send({ resident });
  } catch (e) {
   return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.get("", async (req, res) => {
    try {
      let residents = await Resident.find().populate("flat").lean().exec();
  
      return res.status(201).send({ residents });
    } catch (e) {
      return res.status(500).json({ status: "Failed", message: e.message });
    }
  });

router.get("/:id", async (req, res) => {
  try {
    let resident = await Resident.findById(req.params.id).lean().exec();

    return res.status(201).send({ resident });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let resident = await Resident.findByIdAndUpdate(
      request.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res.status(201).send({ resident });
  } catch (e) {
    res.status(500).json({ status: "Failed", message: e.message });
  }
});

module.exports = router;