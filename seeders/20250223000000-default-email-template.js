"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("email_templates", [
      {
        name: "resume",
        html: "<p>Hi {recruiter},</p> <p>I came across your LinkedIn post about the hiring of a {designation} at {company}. I am very interested in this opportunity and believe my background makes me a strong candidate. With over 4.5+ years of experience in {type} development, including team lead expertise, I have honed my skills in building scalable, high-performance web applications.</p> <p>I have attached my resume for your review. I would love to discuss how my experience and skills align with the needs of your team.</p> <p>Looking forward to the possibility of working together. </p>",
        variables: JSON.stringify([
          "recruiterName",
          "designation",
          "company",
          "type",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("email_templates", null, {});
  },
};
