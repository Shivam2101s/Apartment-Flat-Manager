const express = require("express");

const Flat = require("../models/flat.model");

const router = express.Router();


router.post("", async (req, res) => {
  try {
    let flat = await Flat.create(req.body);

    return res.status(201).send({ flat });
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

router.get("/:id", async (req, res) => {
  try {
    let flat = await Flat.findById(req.params.id)
      .populate("residents")
      .lean()
      .exec();

    return res.status(201).send(flat);
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

//-------All data , filter and sorting API-----------

//`http://localhost:4500/flat/${filter}/${value}/?page=${page}&size=${4}`

router.get("/:filter/:sort", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 4;
    const skip = (page - 1) * size;
    const filter = req.params.filter ;
    const sort = req.params.sort ;

    if (filter == 0 && sort == 0) {
      let flats = await Flat.find()
        .populate("residents")
        .skip(skip)
        .limit(size)
        .lean()
        .exec();

      let totalPage = Math.ceil((await Flat.find().countDocuments()) / size);

      return res.status(201).send({ flats, totalPage });

    } else if (filter != 0 && sort== 0) {
      let flats = await Flat.find({ type: filter })
        .skip(skip)
        .limit(size)
        .populate("residents")
        .lean()
        .exec();

      let totalPage = Math.ceil(
        (await Flat.find({ type: filter }).countDocuments()) / size);

      return res.status(201).send({ flats, totalPage });
    }else if (filter != 0 && sort != 0)  {
      let flats = await Flat.find({ type: filter })
        .sort({flat_number:+sort})
        .skip(skip)
        .limit(size)
        .populate("residents")
        .lean()
        .exec();

      let totalPage = Math.ceil(
        (await Flat.find({ type: filter }).countDocuments()) / size);

      return res.status(201).send({ flats, totalPage });
    }else if (filter == 0 && sort!= 0)  {
      let flats = await Flat.find()
        .sort({flat_number:+sort})
        .skip(skip)
        .limit(size)
        .populate("residents")
        .lean()
        .exec();

      let totalPage = Math.ceil(
        (await Flat.find().countDocuments()) / size);

      return res.status(201).send({ flats, totalPage });
    }

    } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

module.exports = router;
