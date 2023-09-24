const dotenv = require("dotenv");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.prod" });
} else {
  dotenv.config({ path: ".env.dev" });
}

const appConfig = {
  webFrontendURL: process.env.WEB_FRONTEND_URL,
  appName: process.env.APP_NAME,
  environment: process.env.NODE_ENV,
  port: JSON.parse(process.env.PORT),
  databaseURL: process.env.DATABASE_URL,
  databaseName: process.env.DATABASE_NAME,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  bcryptSaltRounds: JSON.parse(process.env.BCRYPT_SALT_ROUNDS),
};

module.exports = { appConfig };
