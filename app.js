const { appConfig } = require("./configs/appConfig");
global.appConfig = appConfig;

const express = require("express");
const cors = require("cors");
const { getServerDetails } = require("./utils/");
const { connectToMongoDB } = require("./configs/connectToMongoDB");
const { serverConstant } = require("./constants/serverConstant");
const app = express();
const routes = require("./app/routes");

const webFrontendURL =
  appConfig.environment === "production"
    ? "http://localhost:4200"
    : "http://localhost:4200";

app.use(
  cors({
    origin: webFrontendURL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: serverConstant.AUTHORIZATION_HEADER_KEY,
  })
);

app.use(express.json());

app.use(routes);

connectToMongoDB();

process.on("SIGINT", () => {
  process.exit(0);
});
process.on("SIGTERM", () => {
  process.exit(0);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception: ", error);
  process.exit(1);
});

app.listen(appConfig.port, () => {
  getServerDetails();
});
