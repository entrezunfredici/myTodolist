const { usersTodos } = require('../models');
const { NotFound, NotLogged, BadRequest, ServerError } = require('../errors');

exports.getUsersTodos = async () => {
    return await usersTodos.findAll();
}

exports.getUsersTodosByUserId = async (userId) => {
    return await usersTodos.findAll({
        where: {
            userId
        }
    });
}

exports.getUsersTodosByTodoId = async (todoId) => {
    return await usersTodos.findAll({
        where: {
            todoId
        }
    });
}

exports.addUsersTodos = async (userId, todoId) => {
    if (!userId || !todoId) {
        throw new BadRequest('userId and todoId are required');
    }
    return usersTodos.create({ userId, todoId });
}

exports.deleteUsersTodos = async (userId, todoId) => {
    try {
        await usersTodos.destroy({
            where: {
                userId,
                todoId
            }
        });
        return true;
    } catch (e) {
        throw new ServerError
    }
}
