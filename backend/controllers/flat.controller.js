const express = require("express");

const Flat = require("../models/flat.model");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 4;
    const skip = (page-1)*size;
    let flats = await Flat.find().populate("residents").skip(skip).limit(size).lean().exec();
 
    
    const totalPage = Math.ceil((await Flat.find().countDocuments()) / size);
    return res.status(201).send({flats,totalPage});
  } catch (e) {
   return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.post("", async (req, res) => {
  try {
    let flat = await Flat.create(req.body);

    return res.status(201).send({ flat });

  } catch (e) {
   return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let flat = await Flat.findById(req.params.id).populate("residents").lean().exec();

    return res.status(201).send( flat );
  } catch (e) {
   return res.status(500).json({ status: "Failed", message: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let flat = await Flat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ flat });
  } catch (e) {
   return res.status(500).json({ status: "Failed", message: e.message });
  }
});


module.exports = router;