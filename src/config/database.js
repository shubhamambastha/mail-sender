const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  }
);

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Run migrations
    await umzug.up();
    console.log("Migrations have been executed successfully.");
  } catch (error) {
    console.error(
      "Unable to connect to the database or run migrations:",
      error
    );
    process.exit(1);
  }
};

module.exports = { sequelize, initializeDatabase };
