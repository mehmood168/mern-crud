const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const taskName = req.body.taskName;
    const description = req.body.description;
    const dueDate = req.body.dueDate;

    const newTask = new Task({
        taskName,
        description,
        dueDate
    });
    console.log("helllo "+taskName);
    newTask.save()
        .then(() => res.json('Task Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            task.taskName = req.body.taskName;
            task.description = req.body.description;
            task.dueDate = Date.parse(req.body.dueDate);
            task.save()
                .then(() => res.json('Task Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;