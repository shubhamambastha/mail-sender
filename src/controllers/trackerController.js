const { v4: uuidv4 } = require("uuid");
const dbService = require("../services/dbService");

/**
 * @swagger
 * /tracking/generate-tracking-url:
 *   get:
 *     summary: Generate a unique tracking URL
 *     responses:
 *       200:
 *         description: Tracking URL generated successfully
 *       500:
 *         description: Internal server error
 */
const generateTrackingUrl = async (req, res) => {
  const trackingId = uuidv4();
  await dbService.setTrackingData(trackingId, {
    created: new Date().toISOString(),
    opens: "0",
  });
  return `${process.env.BASE_URL}/track/${trackingId}`;
};

/**
 * @swagger
 * /tracking/track/{id}:
 *   get:
 *     summary: Track email open
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tracking successful
 *       404:
 *         description: Tracking ID not found
 */
const getTrackById = async (req, res) => {
  const { id } = req.params;
  const trackData = await dbService.getTrackingData(id);

  if (Object.keys(trackData).length > 0) {
    const opens = parseInt(trackData.opens) + 1;
    await dbService.setTrackingData(id, {
      opens: opens.toString(),
      lastOpened: new Date().toISOString(),
    });
  }

  // Send a 1x1 transparent GIF
  res.writeHead(200, {
    "Content-Type": "image/gif",
    "Content-Length": "43",
  });
  res.end(
    Buffer.from(
      "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      "base64"
    )
  );
};

/**
 * @swagger
 * /tracking/tracking-data/{id}:
 *   get:
 *     summary: Get tracking data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tracking data retrieved successfully
 *       404:
 *         description: Tracking ID not found
 */
const getTrackingData = async (req, res) => {
  const { id } = req.params;
  const trackData = await dbService.getTrackingData(id);

  if (Object.keys(trackData).length > 0) {
    res.json(trackData);
  } else {
    res.json({ error: "Tracking ID not found" });
  }
};

module.exports = { generateTrackingUrl, getTrackById, getTrackingData };
