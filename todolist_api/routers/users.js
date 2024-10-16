const router = require('express').Router();
usersController = require('../controllers/users');

//route for get uall users
router.get('/', usersController.getUsers);
//route for get user by id
router.get('/id/:id', usersController.getUserById);
//route for get user by username
router.get('/username/:username', usersController.getUserByUsername);
//route for register
router.post('/register', usersController.register);
// Route pour la connexion
router.post('/login', usersController.login);

module.exports = router;
