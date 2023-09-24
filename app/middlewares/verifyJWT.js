const {
  responseConstant,
  serverConstant,
  userActionConstant,
  statusCodeConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");

const jwt = require("jsonwebtoken");
const {
  checkExistingUser,
} = require("../controllers/authentication/utils/authenticationHelper");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const decodedData = jwt.verify(token, appConfig.jwtSecret);
    const existingUser = await checkExistingUser(decodedData?.email);
    req.body["email"] = existingUser?.email;
    next();
  } catch (error) {
    logger(error);
    const generatedResponse = responseBuilder(userActionConstant.SIGN_IN_AGAIN);
    return res.status(statusCodeConstant.UNAUTHORIZED).send(generatedResponse);
  }
};

module.exports = { verifyJWT };
