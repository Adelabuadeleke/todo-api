const { Router } = require('express');
const todoController = require('../controllers/todoController')


const router = Router();

router.get('/todo/tasks', todoController.task_get);
router.post('/todo/new', todoController.post_task);
router.patch('/todo/edit/:id', todoController.task_patch);
router.delete('/todo/delete/:id', todoController.delete_task);

module.exports = router;
