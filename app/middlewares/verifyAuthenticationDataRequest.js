const { userActionConstant, statusCodeConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");

const {
  checkExistingUser,
} = require("../controllers/authentication/utils/authenticationHelper");
const { AuthenticationDataValidator } = require("../models");

const verifyAuthenticationDataRequest = async (req, res, next) => {
  try {
    const userData = req.body;
    const currentRoute = req.originalUrl;

    const { dataIsInvalid, feedbackMessage } =
      await new AuthenticationDataValidator(userData).getValidationResult();

    if (dataIsInvalid) {
      const generatedResponse = responseBuilder(feedbackMessage);
      return res.status(statusCodeConstant.INVALID).send(generatedResponse);
    }

    const existingUser = await checkExistingUser(userData.email);
    if (existingUser && currentRoute === "/api/signup") {
      logger("Inside sign up and user exists.");
      const generatedResponse = responseBuilder(
        userActionConstant.EMAIL_ALREADY_EXISTS
      );
      return res
        .status(statusCodeConstant.ALREADY_EXISTS)
        .send(generatedResponse);
    } else if (!existingUser && currentRoute === "/api/signin") {
      logger("Inside sign in and user does not exists.");
      const generatedResponse = responseBuilder(
        userActionConstant.INVALID_CREDENTIALS
      );
      return res.status(statusCodeConstant.NOT_FOUND).send(generatedResponse);
    } else if (existingUser && currentRoute === "/api/signin") {
      logger("Inside sign in and user exists.");
      req.body["hashedPassword"] = existingUser.password;
    }
    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      userActionConstant.VERIFY_DATA_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { verifyAuthenticationDataRequest };
