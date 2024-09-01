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

module.exports = { createTrackingUrl };
