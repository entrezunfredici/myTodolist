const { todo } = require('../models');
const { NotFound, NotLogged, BadRequest, ServerError } = require('../errors');

exports.getTodos = async () => {
    return await todo.findAll()
}

exports.getTodoByTitle = async (title) => {
    return await todo.findOne({
        where: {
            title
        }
    })
}

exports.getTodoById = async (id) => {
    return await todo.findOne({
        where: {
            id
        }
    });
}

exports.addTodo = async (title, content, date) => {
    if (!title || !content || date) {
        throw new Error('title, content and date are required');
    }
    return await todo.create({title, content, date})
}

exports.editTodo = async (id, title, content, date) => {
    if (!id || !title || !content || date) {
        throw new Error('id, title, content and date are required');
    }
    thisTodo = await this.getTodoById(id)
    return await thisTodo.update({title, content, date})
}

exports.deleteTodoById = async (id) => {
    try{
        await todo.destroy({
            where:{
                id
            }
        });
        return true;
    }catch(e){
        throw new ServerError(e.message);
    }
}
