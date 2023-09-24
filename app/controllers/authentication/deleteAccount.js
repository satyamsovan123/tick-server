const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
  serverConstant,
} = require("../../../constants");
const { User, DrinkData } = require("../../models");

const deleteAccount = async (req, res) => {
  try {
    const userData = req.body;

    const deletedAccount = await User.deleteOne({ email: userData.email });
    const deletedData = await DrinkData.deleteOne({ email: userData.email });
    logger([`Delete account `, deletedAccount]);
    logger([`Delete data `, deletedData]);

    if (!deletedAccount || deletedAccount?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        userActionConstant.NO_EMAIL_FOUND
      );
      return res.status(statusCodeConstant.NOT_FOUND).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      userActionConstant.DELETE_ACCOUNT_SUCCESS
    );
    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Delete account error `, error]);

    const generatedResponse = responseBuilder(
      userActionConstant.DELETE_ACCOUNT_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { deleteAccount };
