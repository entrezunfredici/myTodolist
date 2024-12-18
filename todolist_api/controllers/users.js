const jwt = require('jsonwebtoken');
const usersService = require('../services/users');
const createError = require('http-errors');
const { ServerError } = require('../errors');

exports.authMiddleware = async (req, res, next) => {
    if (req.headers && !req.headers.authorization) {
        res.status(401).json({success: false, message: 'You need to be authenticated'});
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = await jwt.verify(token, process.env.SECRET);
            if (decodedToken) {
                next();
            } else {
                next(createError(401, 'Authentication is no more valid'))
            }
        } catch(e) {
            next(e);
        }
    }
}

exports.getUsers = async (req, res, next) => {
    try{
        const users = await usersService.getUsers();
        if (!users) {
            throw createError(404, 'no users');
        }
        res.json(users);
    } catch (error) {
        next(new ServerError());
    }
}

exports.getUserByUsername = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await usersService.getUserByUsername(username);
        if (!user) {
            throw createError(404, 'User not found');
        }
        res.json(user);
    } catch (error) {
        next(new ServerError());
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await usersService.getUserById(userId);
        if (!user) {
            throw createError(404, 'User not found');
        }
        res.json(user);
    } catch (error) {
        next(new ServerError());
    }
};

exports.register = async (req, res, next) => {
    const {username, password, email} = req.body;
    try {
        const user = await usersService.addUser(username, password, email)
        if (!user) {
            throw new ServerError('Cannot register user')
        }
        return res.status(201).json(true).send()
    } catch(e) {
        return next(createError(e.statusCode, e.message))
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const token = await usersService.login(username, password);
        if (token) {
            return res.status(200).json({ success: true, token });
        }
        return res.status(400).json({ success: false, token: ''});
    } catch(error) {
        return next(createError(500, error));
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const user = await usersService.deleteUserById(req.params.id);
        if (!user) {
            res.status(404).json({success: false, message: 'User not found'});
        } else {
            res.status(200).json({success: true, message: "user deleted"});
        }
    } catch(e) {
        res.status(500).json({success: false, message: e.message});
    }
}
