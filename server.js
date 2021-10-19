require("dotenv").config({ path: "./config.env" });
const app = require("./app");

//connecting MongoDB
require("./database/db")();

const port = process.env.PORT || 8900;
const server = app.listen(port, () =>
  console.log(`App running on port ${port}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! --- Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

module.exports = server;
