const express = require("express");
const { sendEmailWithTracking } = require("../controllers/emailController");

const router = express.Router();

router.post("/send-email", sendEmailWithTracking);

module.exports = router;
