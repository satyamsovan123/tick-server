const { logger } = require("../../../../utils");
const { Todo } = require("../../../models");
const bcrypt = require("bcrypt");
const saltRounds = Number(appConfig.saltRounds);
const jwt = require("jsonwebtoken");

const checkExistingTodo = async (email) => {
  let cursorData = null;

  if (!email) {
    return cursorData;
  }
  await Todo.find({ email: email }, { email: 0, _id: 0, __v: 0 })
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

module.exports = {
  checkExistingTodo,
};
