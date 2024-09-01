const express = require("express");
const {
  generateTrackingUrl,
  getTrackById,
  getTrackingData,
} = require("../controllers/trackerController");

const router = express.Router();

router.get("/generate-tracking-url", generateTrackingUrl);
router.get("/track/:id", getTrackById);
router.get("/tracking-data/:id", getTrackingData);

module.exports = router;
