const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
  serverConstant,
} = require("../../../constants");

const {
  comparePassword,
  generateJWT,
} = require("./utils/authenticationHelper");

const signIn = async (req, res) => {
  try {
    const userData = req.body;

    const isPasswordValid = await comparePassword(
      userData.password,
      userData.hashedPassword
    );
    if (!isPasswordValid) {
      const generatedResponse = responseBuilder(
        userActionConstant.INVALID_CREDENTIALS
      );
      return res
        .status(statusCodeConstant.UNAUTHORIZED)
        .send(generatedResponse);
    }

    const token = await generateJWT({ email: userData.email });
    logger([`Sign in `, userData.email]);

    const generatedResponse = responseBuilder(
      userActionConstant.SIGN_IN_SUCCESS
    );
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(statusCodeConstant.SUCCESS)
      .send(generatedResponse);
  } catch (error) {
    logger([`Sign in error `, error]);

    const generatedResponse = responseBuilder(userActionConstant.SIGN_IN_ERROR);
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { signIn };
