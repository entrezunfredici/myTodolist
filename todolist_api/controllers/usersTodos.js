const usersTodosService = require('../services/usersTodos');
const createError = require('http-errors');
const { ServerError } = require('../errors');

exports.getUsersTodos = async (req, res, next) => {
    try {
        const usersTodos = await usersTodosService.getUsersTodos();
        if (!usersTodos) {
            throw createError(404, 'no usersTodos');
        }
        res.json(usersTodos);
    } catch (error) {
        next(new ServerError());
    }
}

exports.getUsersTodosByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const usersTodos = await usersTodosService.getUsersTodosByUserId(userId);
        if (!usersTodos) {
            throw createError(404, 'usersTodos not found');
        }
        res.json(usersTodos);
    } catch (error) {
        next(new ServerError());
    }
}

exports.getUsersTodosByTodoId = async (req, res, next) => {
    try {
        const todoId = req.params.todoId;
        const usersTodos = await usersTodosService.getUsersTodosByTodoId(todoId);
        if (!usersTodos) {
            throw createError(404, 'usersTodos not found');
        }
        res.json(usersTodos);
    } catch (error) {
        next(new ServerError());
    }
}

exports.addUsersTodos = async (req, res, next) => {
    try {
        const { userId, todoId } = req.body;
        if (!userId || !todoId) {
            throw createError(400, 'userId and todoId are required');
        }
        const usersTodos = await usersTodosService.addUsersTodos(userId, todoId);
        res.json(usersTodos);
    } catch (error) {
        next(new ServerError());
    }
}

exports.deleteUsersTodos = async (req, res, next) => {
    try {
        const { userId, todoId } = req.body;
        const usersTodos = await usersTodosService.deleteUsersTodos(userId, todoId);
        res.json(usersTodos);
    } catch (error) {
        next(new ServerError());
    }
}
