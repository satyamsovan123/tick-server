const { signUp } = require("./authentication/signUp");
const { signIn } = require("./authentication/signIn");
const { getAllTodos } = require("./todo/getTodo");
const { deleteAllTodos } = require("./todo/deleteTodo");
const { addTodo } = require("./todo/addTodo");

const {
  checkExistingUser,
  comparePassword,
  generateJWT,
  encryptPassword,
} = require("./authentication/utils/authenticationHelper");

const { checkExistingTodo } = require("./todo/utils/todoManipulationHelper");

module.exports = {
  signUp,
  signIn,
  addTodo,
  getAllTodos,
  deleteAllTodos,
  checkExistingUser,
  comparePassword,
  generateJWT,
  encryptPassword,
  checkExistingTodo,
};
