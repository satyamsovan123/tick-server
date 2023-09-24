const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { Todo } = require("../../models");
const { checkExistingTodo } = require("./utils/todoManipulationHelper");

const addTodo = async (req, res) => {
  // throw new Error(userActionConstant.GENERIC_ERROR);

  try {
    const userData = req.body;

    const todo = new Todo({
      email: userData.email,
      todo: userData.todo,
      isComplete: userData.isComplete,
    });

    const newTodo = await Todo.create(todo);

    if (!newTodo) {
      const generatedResponse = responseBuilder(
        userActionConstant.ADD_TODO_ERROR
      );
      return res.status(statusCodeConstant.ERROR).send(generatedResponse);
    }

    logger([`Add data `, newTodo]);

    const generatedResponse = responseBuilder(
      userActionConstant.ADD_TODO_SUCCESS
    );

    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Add data error `, error]);

    const generatedResponse = responseBuilder(
      userActionConstant.ADD_TODO_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { addTodo };
