const express = require("express");
const emailRoutes = require("./emailRoutes");
const trackingRoutes = require("./trackingRoutes");

const router = express.Router();

router.use("/email", emailRoutes);
router.use("/tracking", trackingRoutes);

module.exports = router;
