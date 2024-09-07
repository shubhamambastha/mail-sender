const nodemailer = require("nodemailer");
const { createTrackingUrl } = require("./trackingService");

function generateTemplate(type, data) {
  switch (type) {
    case "resume":
      return {
        subject: "Your Resume Application",
        text: `Dear ${data.name},\n\nThank you for submitting your resume. We will review it and get back to you soon.\n\nBest regards,\nThe HR Team`,
        html: `<p>Dear ${data.name},</p><p>Thank you for submitting your resume. We will review it and get back to you soon.</p><p>Best regards,<br>The HR Team</p>`,
      };
    case "marketing":
      return {
        subject: "Exciting New Product Coming Soon!",
        text: `Dear ${data.name},\n\nWe're thrilled to announce our upcoming product launch. Stay tuned for more details!\n\nBest regards,\nThe Marketing Team`,
        html: `<p>Dear ${data.name},</p><p>We're thrilled to announce our upcoming product launch. Stay tuned for more details!</p><p>Best regards,<br>The Marketing Team</p>`,
      };
    case "business":
      return {
        subject: "New Business Launch Announcement",
        text: `Dear ${data.name},\n\nWe're excited to inform you about the launch of our new business. We look forward to serving you!\n\nBest regards,\nThe Business Development Team`,
        html: `<p>Dear ${data.name},</p><p>We're excited to inform you about the launch of our new business. We look forward to serving you!</p><p>Best regards,<br>The Business Development Team</p>`,
      };
    default:
      throw new Error("Invalid email type");
  }
}

async function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

async function sendEmail({ to, type, data }) {
  if (!type || !data) {
    throw new Error("Email type and data are required");
  }

  const template = generateTemplate(type, data);
  const transporter = await createTransporter();
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: template.subject,
    text: template.text,
    html: template.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to} with type: ${type}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

async function sendEmailWithTracking({ to, type, data }) {
  const trackingUrl = await createTrackingUrl();
  data.trackingUrl = trackingUrl;
  const info = await sendEmail({ to, type, data });
  return { trackingUrl, messageId: info.messageId };
}

module.exports = {
  createTransporter,
  sendEmail,
  sendEmailWithTracking,
  generateTemplate,
};
