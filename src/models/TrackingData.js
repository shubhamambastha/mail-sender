const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const TrackingData = sequelize.define(
  "TrackingData",
  {
    trackingId: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: "tracking_id",
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created",
    },
    opens: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "opens",
    },
    lastOpened: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_opened",
    },
  },
  {
    tableName: "tracking_data",
    timestamps: true,
  }
);

module.exports = TrackingData;
