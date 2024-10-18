const { todos } = require('../models');
const { NotFound, NotLogged, BadRequest, ServerError } = require('../errors');

exports.getTodos = async () => {
    return await todos.findAll();
}

exports.getTodoByTitle = async (title) => {
    return await todos.findOne({
        where: {
            title
        }
    });
}

exports.getTodoById = async (id) => {
    return await todos.findOne({
        where: {
            id
        }
    });
}

exports.addTodo = async (title, content, date) => {
    if (!title || !content || !date) {
        throw new BadRequest('title, content and date are required');
    }
    return todos.create({ title, content, date });
}

exports.editTodo = async (id, title, content, date) => {
    if (!id || !title || !content || !date) {  // Corrected condition
        throw new BadRequest('id, title, content and date are required');
    }
    const thisTodo = await exports.getTodoById(id);  // Use 'exports.getTodoById'
    if (!thisTodo) {
        throw new NotFound('Todo not found');
    }
    return thisTodo.update({ title, content, date });
}

exports.deleteTodoById = async (id) => {
    try {
        await todos.destroy({  // Use 'todos' instead of 'todo'
            where: {
                id
            }
        });
        return true;
    } catch (e) {
        throw new ServerError(e.message);
    }
}
