const mysql = require("mysql2/promise");

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "email_tracker"}`
  );
  await connection.query(`USE ${process.env.DB_NAME || "email_tracker"}`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS tracking_data (
      tracking_id VARCHAR(36) PRIMARY KEY,
      created DATETIME,
      opens INT DEFAULT 0,
      last_opened DATETIME
    )
  `);

  await connection.end();
}

module.exports = { initializeDatabase };
