const Todo = require('../models/todo');

function successReturn(res, payload) {
    return res.status(200).json(payload);
}

function errorReturn(next, payload) {
    next({ status: 400, message: payload });
}

exports.getAll = async function (req, res, next) {
    try {
        const todos = await Todo.find({});
        return successReturn(res, todos);
    } catch (err) {
        errorReturn(next, "Failed to get todos");
    }
}

exports.create = async function (req, res, next) {
    try {
        const todoCredential = req.body;
        const todo = await Todo.create(todoCredential);
        return successReturn(res, todo);
    } catch (err) {
        errorReturn(next, "Failed to create todo");
    }
}

exports.getOne = async function (req, res, next) {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findOne({ _id: todoId });
        return successReturn(res, todo);
    } catch (err) {
        errorReturn(next, "Failed to get selected todo");
    }
}

exports.update = async function (req, res, next) {
    try {
        const todoId = req.params.id;
        const todoCredential = req.body.task;

        const todo = await Todo.findByIdAndUpdate(todoId, {
            $set: {
                completed: todoCredential.completed,
            }
        });
        const updatedTodo = await Todo.findById(todoId);

        return successReturn(res, updatedTodo);
    } catch (err) {
        errorReturn(next, "Failed to update selected todo");
    }
}

exports.delete = async function (req, res, next) {
    try {
        const todoId = req.params.id;

        await Todo.findByIdAndRemove(todoId);
        const todos = await Todo.find({});

        return successReturn(res, todos);
    } catch (err) {
        errorReturn(next, "Failed to update selected todo");
    }
}