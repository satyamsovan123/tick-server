const serverConstant = {
  INTERNAL_SERVER_ERROR: "Internal server error.",
  SERVER_IS_RUNNING: "Server is running.",
  AUTHORIZATION_HEADER_KEY: "Authorization",
  SERVER_URL: "http://localhost:3000",
  INVALID_API_PATH:
    "The API path you provided doesn't exists. Please use http://localhost:3000/api/.",
  BASE_API: "/api/",
  DATABASE_CONNECTION_ERROR: "We are unable to connect to database.",
  DATABASE_CONNECTION_SUCCESS: "We are connected to database.",
};

module.exports = { serverConstant };
