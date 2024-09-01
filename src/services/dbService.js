const TrackingData = require("../models/TrackingData");

const setTrackingData = async (trackingId, data) => {
  await TrackingData.upsert({
    trackingId,
    created: data.created,
    opens: data.opens,
    lastOpened: data.lastOpened,
  });
};

const getTrackingData = async (trackingId) => {
  return await TrackingData.findByPk(trackingId);
};

module.exports = {
  setTrackingData,
  getTrackingData,
};
