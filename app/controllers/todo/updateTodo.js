const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
  serverConstant,
  responseConstant,
} = require("../../../constants");
const { Todo } = require("../../models");
const { checkExistingTodo } = require("./utils/todoManipulationHelper");

const updateTodo = async (req, res) => {
  try {
    const userData = req.body;

    const newTodo = {
      email: userData.email,
      todo: userData.todo,
      isComplete: userData.isComplete,
    };

    const existingTodo = await checkExistingTodo(userData.email);
    logger([`Update data `, existingTodo]);

    await Todo.findOneAndUpdate({ email: userData.email }, newTodo);

    const generatedResponse = responseBuilder(
      userActionConstant.PLEASE_TRY_AGAIN_LATER
    );

    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Update data error `, error]);

    const generatedResponse = responseBuilder(userActionConstant.GENERIC_ERROR);
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { updateTodo };
