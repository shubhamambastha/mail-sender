const nodemailer = require("nodemailer");
const { createTrackingUrl } = require("./trackingService");
const EmailTemplate = require("../models/EmailTemplate");

async function generateTemplate(id) {
  const template = await EmailTemplate.findOne({
    where: { id: id },
  });

  if (!template) {
    throw new Error("Invalid email type");
  }

  // Replace variables in the template
  let html = template.html;
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, "g");
    html = html.replace(regex, value);
  });

  return html;
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

  const template = generateTemplate(id);
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
  const updatedData = { ...data, trackingUrl };
  const info = await sendEmail({ to, type, data: updatedData });
  return { trackingUrl, messageId: info.messageId, updatedData };
}

module.exports = {
  createTransporter,
  sendEmail,
  sendEmailWithTracking,
  generateTemplate,
};
