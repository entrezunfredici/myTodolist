const router = require('express').Router();
usersController = require('../controllers/users');

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: récupère tous les utilisateurs
 */
router.get('/', usersController.getUsers);
/**
 * @swagger
 * /users/{id}:
 *     get:
 *         summary: "récupérer un utilisateur par son id"
 *         responses:
 *             "200":
 *                 description: "L'utilisateur à été trouvé"
 *                 content:
 *                     application/json:
 *                     schema: 
 *                         $ref: '#/components/schemas/users'
 *             "404":
 *                 description: "user not found"
 */
router.get('/:id', usersController.getUserById);
/**
@swagger
    /users/name/{username}:
        get:
            summary: "récupérer un utilisateur par son username"
            operationId: getUserByUsername
            parameters:
                - name: "username"
                in: "path"
                description: "Le nom d'utilisateur"
                required: true
                schema: 
                    type: "string"
            responses:
                "200":
                description: "L'utilisateur recherché est retourné"
                content:
                    application/json:
                    schema: 
                        $ref: '#/components/schemas/users'
                "404":
                description: "user not found"
 */
router.get('/username/:username', usersController.getUserByUsername);
/**
@swagger
    /users/register:
        post:
            summary: "ajouter un utilisateur"
            operationId: addUser
            requestBody:
                description: "doit contenir les informations essentiels soit l'username, le password et le mail"
                required: true
                content:
                application/json:
                    schema:
                    $ref: '#/components/schemas/users'
            responses:
                "201":
                description: "Ajoute un utilisateur"
                content: true
                "400": 
                description: "Un champs essentiels n'est pas présent ou incorrect (username, password, mail)"
 */
router.post('/register', usersController.register);
/**
@swagger
    /users/login:
        post: 
            summary: "connecter un utilisateur"
            operationId: loginUser
            requestBody:
                description: "doit contenir les informations essentiels soit l'username et le password"
                required: true
                content:
                application/json:
                    schema:
                    $ref: '#/components/schemas/users'
 */
router.post('/login', usersController.login);
/**
@swagger
    /users/{id}:
        delete:
            summary: "supprimer un utilisateur"
            operationId: "deleteUserById"
            parameters:
                - name: "id"
                in: "path"
                description: "L'identifiant de l'utilisateur"
                required: true
                schema: 
                    type: "integer"
            responses:
                "201":
                description: "L'utilisateur à été supprimé"
                content:
                    application/json:
                    schema: 
                        $ref: '#/components/schemas/users'
                "404":
                description: "user not found"
 */
router.delete('/:id', usersController.deleteUserById);

module.exports = router;
