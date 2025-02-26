const axios = require("axios");
const { sendEmailWithTracking } = require("../services/emailService");

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
    const { templateId, entities } = req.body;

    if (!Array.isArray(entities) || entities.length === 0) {
      return res
        .status(400)
        .json({ error: "Entities must be a non-empty array" });
    }

    const results = [];
    const errors = [];

    // Process each entity in the array
    for (const entity of entities) {
      const {
        email,
        subject,
        recruiterName,
        companyName,
        jobDesignation,
        ...otherVariables
      } = entity;

      if (!email || !subject) {
        errors.push({ email, error: "Missing required fields" });
        continue;
      }

      const { trackingUrl, messageId } = await sendEmailWithTracking({
        to: email,
        subject, // Assuming subject is used as type
        data: {
          templateId,
          recruiterName,
          companyName,
          jobDesignation,
          ...otherVariables,
        },
      });

      try {
        // For demonstration, let's log the tracking data after a short delay
        const trackingId = trackingUrl.split("/").pop();
        checkTrackingData(trackingId); // Start checking tracking data

        results.push({
          email,
          status: "success",
          trackingUrl,
          messageId,
        });
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
        errors.push({ email, error: "Failed to send email" });
      }
    }

    res.json({
      message: `Processed ${entities.length} emails`,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error sending email with tracking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendEmailHandler,
};
