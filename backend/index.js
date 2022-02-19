const express = require('express');
const cors = require("cors");
const managerController = require('./controllers/manager.controller');
const flatController = require('./controllers/flat.controller');
const residentController = require('./controllers/resident.controller');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/manager",managerController);
app.use("/flat",flatController);
app.use("/resident",residentController);

module.exports = app;