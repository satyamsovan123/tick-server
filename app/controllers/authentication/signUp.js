const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
  serverConstant,
} = require("../../../constants");
const { User } = require("../../models");
const {
  generateJWT,
  encryptPassword,
} = require("./utils/authenticationHelper");

const signUp = async (req, res) => {
  try {
    const userData = req.body;

    const encryptedPassword = await encryptPassword(userData.password);
    await User.create(
      new User({
        email: userData.email,
        password: encryptedPassword,
      })
    );

    const token = await generateJWT({ email: userData.email });
    logger([`Sign up `, userData.email]);

    const generatedResponse = responseBuilder(
      userActionConstant.SIGN_UP_SUCCESS
    );
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(statusCodeConstant.SUCCESS)
      .send(generatedResponse);
  } catch (error) {
    logger([`Sign in error `, error]);

    const generatedResponse = responseBuilder(userActionConstant.SIGN_UP_ERROR);
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { signUp };
