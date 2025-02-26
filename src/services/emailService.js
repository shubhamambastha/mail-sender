const nodemailer = require("nodemailer");
const { createTrackingUrl } = require("./trackingService");
const templateService = require("./templateService");

async function generateTemplate(id, data = {}) {
  const template = await templateService.getById(id);

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

async function sendEmail({ to, id, data }) {
  if (!id || !data) {
    throw new Error("Email template ID and data are required");
  }

  const template = await generateTemplate(id, data);
  const transporter = await createTransporter();
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: data.subject,
    html: template,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to} with template ID: ${id}`);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

async function sendEmailWithTracking({ to, id, data }) {
  const trackingUrl = await createTrackingUrl();
  const updatedData = { ...data, trackingUrl };
  const info = await sendEmail({ to, id, data: updatedData });
  return { trackingUrl, messageId: info.messageId, updatedData };
}

module.exports = {
  createTransporter,
  sendEmail,
  sendEmailWithTracking,
  generateTemplate,
};
