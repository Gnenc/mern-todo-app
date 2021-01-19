const router = require('express').Router({ mergeParams: true });
const todoController = require('../controllers/todoOperationController');

router.route('/')
    .get(todoController.getAll)
    .post(todoController.create);

router.route('/:id')
    .get(todoController.getOne)
    .put(todoController.update)
    .delete(todoController.delete);

module.exports = router;