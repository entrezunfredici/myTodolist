const { users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotFound, NotLogged, BadRequest, ServerError } = require('../errors');

exports.getUsers = async () => {
    return await users.findAll({ attributes: { exclude: ['password'] } })
}

exports.getUserByUsername = async (username) => {
    return await users.findOne({
        where: {
            username
        },
        attributes: { exclude: ['password'] }
    })
}

exports.getUserByUsernameWithPassword = async (username) => {
    return await users.findOne({
        where: {
            username
        }
    })
}

exports.getUserById = async (id) => {
    return await users.findOne({
        where: {
            id
        },
        attributes: { exclude: ['password'] }
    });
}

exports.addUser = async (username, password, email) => {
    const existingUser = await this.getUserByUsername(username)
    if (existingUser) {
        throw new BadRequest('user already exists')
    }
    return bcrypt.hash(password, 10).then((hash) => {
        return users.create({username, password: hash, email})
    }).catch((e) => {
        throw new ServerError('Error when performing bcrypt: ', e.message)
    })
}

exports.login = async (username, password) => {
    const user = await this.getUserByUsernameWithPassword(username);
    if (!user) {
        throw new NotFound('no user found for username: ' + username);
    }

    const verifiedUser = await bcrypt.compare(password, user.password);
    if (!verifiedUser) {
        throw new NotFound('no user found for username: ' + username);
    }
    return this.createToken(user);
}

exports.createToken = async (user) => {
    if (!process.env.SECRET) {
        throw new Error('SECRET environment variable is not defined');
    }

    return jwt.sign({
        data: { id: user.id, username: user.username, email: user.email, description: user.description, userPhoto: user.userPhoto}
    }, process.env.SECRET, {
        expiresIn: '30s'
    });
}

exports.deleteUserByID = async (id) => {
    return users.destroy({ where: { id } })
}
