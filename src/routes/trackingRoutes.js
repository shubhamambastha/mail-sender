const express = require("express");
const trackerController = require("../controllers/trackerController");

const router = express.Router();

router.get("/generate-tracking-url", trackerController.generateTrackingUrl);
router.get("/track/:id", trackerController.getTrackById);
router.get("/tracking-data/:id", trackerController.getTrackingData);

module.exports = router;
