const express = require("express");

const Manager = require("../models/manager.model");

const router = express.Router();

//-----Sign Up--------

router.post("", async (req, res) => {
  try {
    let newManager = await Manager.create(req.body);
     
    return res.status(201).send({ newManager });
  } catch (e) {
    return res.status(500).json({ status: "Failed", message: e.message });
  }
});

//-------Log In-------

router.post("/:email", async (req, res) => {
  try {
    let manager = await Manager.findOne({ email: req.params.email });

    // if manager does not exist, then throw an error

    if (!manager) {
    return res.status(400).json({
        status: "Failed",
        message: "Please provide correct email address or password.",
      });
    }

    // else we match the password

    const match = await manager.checkPassword(req.body.password);

    // if it does not match then throw an error\

    if (!match) {
     return res.status(400).json({
        status: "Failed",
        message: "Please provide correct email address or password.",
      });
    }

    let token = 12+manager.name+"axis" 

    return res.status(200).send({ manager,token });
  } catch (e) {
    res.status(500).json({ status: "Failed", message: e.message });
  }
});



module.exports = router;
