require("dotenv").config();
const app = require("./src/app");
const { initializeDatabase } = require("./src/config/database");

const port = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(
        `Swagger docs available at http://localhost:${port}/api-docs`
      );
    });
  })
  .catch((error) => {
    console.error("Error initializing database:", error);
    process.exit(1);
  });
