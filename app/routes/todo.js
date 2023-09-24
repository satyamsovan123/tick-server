const express = require("express");
const router = express.Router();
const { verifyJWT, verifyTodoRequest } = require("../middlewares");
const { getAllTodos } = require("../controllers/todo/getTodo");
const { updateTodo } = require("../controllers/todo/updateTodo");
const { addTodo } = require("../controllers/todo/addTodo");
const { deleteAllTodos } = require("../controllers/todo/deleteTodo");

router.get("/todo", verifyJWT, getAllTodos);
router.post("/todo", verifyJWT, verifyTodoRequest, addTodo);
router.put("/todo", verifyJWT, verifyTodoRequest, updateTodo);
router.delete("/todo", verifyJWT, deleteAllTodos);

module.exports = router;
