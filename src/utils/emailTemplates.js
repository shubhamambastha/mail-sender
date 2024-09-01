const generateEmailTemplate = (
  name,
  trackerUrl,
  jobTitle = "Test",
  companyName = "Test",
  platform = "LinkedIn",
  experience = "4+",
  expertise = "JavaScript",
  phoneNumber = "+91-8602167858"
) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div class="container">
                <h1>Hi ${name},</h1>
    
                <p>I’m interested in the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>, which I found on ${platform}. With ${experience} years of experience in ${expertise}, I’m eager to contribute to your team.</p>
    
                <p>Please find my resume attached. Thank you for considering my application.</p>
    
                <div class="footer">
                  <p>Best regards,</p>
                  <p>
                      ${name}
                      <br>
                      ${jobTitle}
                      <br>
                      ${phoneNumber}
                  </p>
                </div>
            </div>
            <img src="${trackerUrl}" alt="" width="0" height="0" style="display:flex;">
        </body>
        </html>
      `;
};

module.exports = { generateEmailTemplate };
