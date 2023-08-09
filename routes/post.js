const express = require('express');
const router = express.Router();
const { getTodos, getTodo, addTodo, updateTodo, deleteTodo, searchTodo, getAllTodos, completedTodo } = require('../controllers/post.js');
const auth = require('../middleware/auth.js');

router.get('/getAllTodos', getAllTodos);
router.get('/getTodos',auth, getTodos);
router.get('/getTodoById/:id',auth, getTodo);
router.post('/addTodo',auth, addTodo);
router.put('/updateTodo/:id',auth, updateTodo);
router.delete('/deleteTodo/:id',auth, deleteTodo);
router.get('/searchTodo',auth, searchTodo);
router.patch('/completedTodo/:id',auth, completedTodo);
module.exports = router