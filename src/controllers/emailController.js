const axios = require("axios");
const { generateTrackingUrl } = require("./trackerController");
const { createTransporter } = require("../services/emailService");
const { generateEmailTemplate } = require("../utils/emailTemplates");

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

async function sendEmailWithTracking(name) {
  try {
    const trackingUrl = await generateTrackingUrl();
    const emailHtml = generateEmailTemplate(name, trackingUrl);

    // Here you would typically send the email using your preferred email sending library
    console.log(`Sending email to with tracking URL: ${trackingUrl}`);

    // For demonstration, let's log the tracking data after a short delay
    const trackingId = trackingUrl.split("/").pop();
    checkTrackingData(trackingId); // Start checking tracking data

    return emailHtml;
  } catch (error) {
    console.error("Error sending email with tracking:", error);
    throw error;
  }
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
  const { email, subject, name } = req.body;

  if (!email || !subject || !name) {
    return res
      .status(400)
      .json({ message: "Email, subject, and name are required." });
  }

  try {
    const transporter = await createTransporter();
    const emailHtml = await sendEmailWithTracking(name);

    const mailOptions = {
      from: process.env.GMAIL_USER, // sender address
      to: email, // receiver address
      subject: subject, // Subject line
      html: emailHtml, // email body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    res
      .status(200)
      .json({ message: "Email sent successfully!", messageId: info.messageId });
  } catch (error) {
    console.error("Error in sendEmailHandler:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

module.exports = {
  sendEmailWithTracking,
  sendEmailHandler,
};
