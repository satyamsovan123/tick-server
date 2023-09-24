const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { Todo } = require("../../models");

const deleteAllTodos = async (req, res) => {
  try {
    const userData = req.body;

    const deletedData = await Todo.deleteMany({ email: userData.email });

    logger([`Delete data `, deletedData]);
    if (!deletedData || deletedData?.deletedCount === 0) {
      const generatedResponse = responseBuilder(
        userActionConstant.NO_TODOS_FOUND
      );
      return res.status(statusCodeConstant.NOT_FOUND).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      userActionConstant.DELETE_TODO_SUCCESS
    );
    return res.status(statusCodeConstant.SUCCESS).send(generatedResponse);
  } catch (error) {
    logger([`Delete data error `, error]);

    const generatedResponse = responseBuilder(
      userActionConstant.DELETE_TODO_ERROR
    );
    return res.status(statusCodeConstant.ERROR).send(generatedResponse);
  }
};

module.exports = { deleteAllTodos };
