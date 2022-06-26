const express = require("express");
const APIController = require("../controllers/apiController");
const router = express.Router();

router.get("/weather", APIController.getWeatherData);

module.exports = router;
