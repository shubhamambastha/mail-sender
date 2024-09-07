const { sendEmailWithTracking } = require("../services/emailService");
const { createTrackingUrl } = require("../services/trackingService");

async function checkTrackingData(
  trackingId,
  duration = 60000,
  interval = 5000
) {
  const endTime = Date.now() + duration;

  const checkData = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/tracking/tracking-data/${trackingId}`
      );
      console.log("Tracking data:", response.data);

      if (Date.now() < endTime) {
        setTimeout(checkData, interval);
      } else {
        console.log("Finished checking tracking data.");
      }
    } catch (error) {
      console.error("Error checking tracking data:", error);
    }
  };

  checkData();
}

/**
 * @swagger
 * /email/send-email:
 *   post:
 *     summary: Send an email
 *     description: Send an email using Gmail with OAuth2 and a default template
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - subject
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const sendEmailHandler = async (req, res) => {
  try {
    const { email, subject, name } = req.body;

    if (!email || !subject || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { trackingUrl, messageId } = await sendEmailWithTracking({
      to: email,
      type: subject, // Assuming subject is used as type
      data: { name },
    });

    // For demonstration, let's log the tracking data after a short delay
    const trackingId = trackingUrl.split("/").pop();
    checkTrackingData(trackingId); // Start checking tracking data

    res.json({
      message: "Email sent successfully",
      trackingUrl,
      messageId,
    });
  } catch (error) {
    console.error("Error sending email with tracking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendEmailHandler,
};
