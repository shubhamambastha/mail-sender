const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "email_tracker",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const setTrackingData = async (trackingId, data) => {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "INSERT INTO tracking_data (tracking_id, created, opens, last_opened) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE opens = ?, last_opened = ?",
      [
        trackingId,
        data.created,
        data.opens,
        data.lastOpened,
        data.opens,
        data.lastOpened,
      ]
    );
  } finally {
    connection.release();
  }
};

const getTrackingData = async (trackingId) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tracking_data WHERE tracking_id = ?",
      [trackingId]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
};

module.exports = {
  setTrackingData,
  getTrackingData,
};
