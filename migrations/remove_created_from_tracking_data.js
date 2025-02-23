"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tracking_data", "created");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("tracking_data", "created", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
