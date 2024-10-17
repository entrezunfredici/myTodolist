const router = require('express').Router();
todoController = require('../controllers/todo');

//route for get all todos
router.get('/', todoController.getTodos);
//route for get todo by id
router.get('/:id', todoController.getTodoById);
//route for get todo by title
router.get('/title/:title', todoController.getTodoByTitle);
//route for add todo
router.post('/add', todoController.addTodo);
//route for edit todo
router.post('/edit', todoController.editTodo);
//route for delete todo
router.delete('/:id', todoController.deleteTodoById);

module.exports = router;
