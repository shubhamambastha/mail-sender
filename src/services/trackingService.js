const { v4: uuidv4 } = require("uuid");
const dbService = require("./dbService");

const createTrackingUrl = async () => {
  const trackingId = uuidv4();
  await dbService.setTrackingData(trackingId, {
    created: new Date(),
    opens: 0,
  });
  return `${process.env.BASE_URL}/track/${trackingId}`;
};

const trackEmailOpen = async (trackingId) => {
  const trackData = await dbService.getTrackingData(trackingId);

  if (trackData) {
    const opens = trackData.opens + 1;
    await dbService.setTrackingData(trackingId, {
      opens,
      lastOpened: new Date(),
    });
  }
};

const getTrackingData = async (trackingId) => {
  return await dbService.getTrackingData(trackingId);
};

module.exports = { createTrackingUrl, trackEmailOpen, getTrackingData };
