const express = require("express");
const emailRoutes = require("./emailRoutes");
const trackingRoutes = require("./trackingRoutes");
const templateRoutes = require("./templateRoutes");

const router = express.Router();

router.use("/email", emailRoutes);
router.use("/tracking", trackingRoutes);
router.use("/templates", templateRoutes);

module.exports = router;
