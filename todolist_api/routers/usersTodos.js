const router = require('express').Router();
usersTodosController = require('../controllers/usersTodos');
/**
 * @swagger
 * /usersTodos/:
 *     get:
 *         summary: "récupère tous les todos"
 */
router.get('/', usersTodosController.getUsersTodos);
/**
 * @swagger
 * /usersTodos/users/{userid}:
 *     get:
 *         summary: "récupérer un lien entre un utilisateur et un rappel a partir de l'id de l'utilisateur"
 */
router.get('/users/:userId', usersTodosController.getUsersTodosByUserId);
/**
 * @swagger
 * /usersTodos/todos/{userid}:
 *     get:
 *         summary: "récupérer un lien entre un utilisateur et un rappel a partir de l'id du rappel"
 */
router.get('/todos/:todoId', usersTodosController.getUsersTodosByTodoId);
/**
 * @swagger
 * /usersTodos/{id}:
 *     post:
 *         summary: "azjoute un lien entre un utilisateur et un rappel"
 */
router.post('/add', usersTodosController.addUsersTodos);
/**
 * @swagger
 * /usersTodos/{id}:
 *     delete:
 *         summary: "supprime un lien entre un utilisateur et un rappel"
 */
router.delete('/:id', usersTodosController.deleteUsersTodos);

module.exports = router;
