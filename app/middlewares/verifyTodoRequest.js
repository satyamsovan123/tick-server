const {
  responseConstant,
  serverConstant,
  userActionConstant,
  statusCodeConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const {
  checkExistingTodo,
} = require("../controllers/todo/utils/todoManipulationHelper");
const { TodoRequestValidator } = require("../models");

const verifyTodoRequest = async (req, res, next) => {
  try {
    const userData = req.body;
    const { dataIsInvalid, feedbackMessage } = await new TodoRequestValidator(
      userData
    ).getValidationResult();

    if (dataIsInvalid) {
      const generatedResponse = responseBuilder(feedbackMessage);
      return res.status(statusCodeConstant.INVALID).send(generatedResponse);
    } else {
      next();
    }
  } catch (error) {
    const generatedResponse = responseBuilder(
      serverConstant.ERROR_OCCURRED_WHILE_VERIFYING
    );
    logger(error);
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { verifyTodoRequest };
