const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo',eventSchema);