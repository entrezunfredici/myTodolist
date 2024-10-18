const todoService = require('../services/todo');
const createError = require('http-errors');
const { ServerError } = require('../errors');


exports.getTodos = async (req, res, next) => {
    try{
        const todos = await todoService.getTodos();
        if (!todos) {
            throw createError(404, 'no todos');
        }
        res.json(todos);
    } catch (error) {
        next(new ServerError());
    }
}

exports.getTodoByTitle = async (req, res, next) => {
    try {
        const title = req.params.title;
        const todo = await todoService.getTodoByTitle(title);
        if (!todo) {
            throw createError(404, 'Todo not found');
        }
        res.json(todo);
    } catch (error) {
        next(new ServerError());
    }
}

exports.getTodoById = async (req, res, next) => {
    try {
        const todoId = req.params.id;
        const todo = await todoService.getTodoById(todoId);
        if (!todo) {
            throw createError(404, 'Todo not found');
        }
        res.json(todo);
    } catch (error) {
        next(new ServerError());
    }
};

exports.addTodo = async (req, res, next) => {
    try {
        const { title, content, date } = req.body;
        const todo = await todoService.addTodo(title, content, date);
        res.json(todo);
    } catch (error) {
        next(new ServerError());
    }
}

exports.editTodo = async (req, res, next) => {
    try {
        const { id, title, content, date } = req.body;
        const todo = await todoService.editTodo(id, title, content, date);
        res.json(todo);
    } catch (error) {
        next(new ServerError());
    }
}

exports.deleteTodoById = async (req, res, next) => {
    try {
        const todoId = req.params.id;
        const todo = await todoService.deleteTodoById(todoId);
        res.json(todo);
    } catch (error) {
        next(new ServerError());
    }
}
