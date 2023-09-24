const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingTodo } = require("./utils/todoManipulationHelper");

const getAllTodos = async (req, res) => {
  try {
    const userData = req.body;
    const data = await checkExistingTodo(userData.email);
    logger([`Get data `, data]);

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        userActionConstant.NO_TODOS_FOUND,
        []
      );
      return res.status(statusCodeConstant.NOT_FOUND).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      `${userActionConstant.GET_TODO_SUCCESS}`,
      data
    );

    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Get data error `, error]);

    const generatedResponse = responseBuilder(
      userActionConstant.GET_TODO_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { getAllTodos };
