const trackingService = require("../services/trackingService");

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
  try {
    const trackingUrl = await trackingService.createTrackingUrl();
    res.json({ trackingUrl });
  } catch (error) {
    console.error("Error generating tracking URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
  try {
    const { id } = req.params;
    await trackingService.trackEmailOpen(id);

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
  } catch (error) {
    console.error("Error tracking email open:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
  try {
    const { id } = req.params;
    const trackData = await trackingService.getTrackingData(id);

    if (trackData) {
      res.json(trackData);
    } else {
      res.status(404).json({ error: "Tracking ID not found" });
    }
  } catch (error) {
    console.error("Error getting tracking data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { generateTrackingUrl, getTrackById, getTrackingData };
