const express = require('express');

const app = express();

console.log('Server file started');

app.use(express.json());


let tasks = [];

let nextId = 1;


// POST /tasks
app.post('/tasks', (req, res) => {

    const task = {
        id: nextId++,
        title: req.body.title,
        completed: req.body.completed
    };


    tasks.push(task);


    res.status(201).json(task);

});



// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {

    const task = tasks.find(
        task => task.id == req.params.id
    );


    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }


    res.status(200).json(task);

});



// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {


    const task = tasks.find(
        task => task.id == req.params.id
    );


    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }


    task.title = req.body.title;
    task.completed = req.body.completed;


    res.status(200).json(task);

});



// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {


    const index = tasks.findIndex(
        task => task.id == req.params.id
    );


    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }


    tasks.splice(index,1);


    res.status(200).json({
        message: "Task deleted"
    });

});



app.listen(3000, () => {

    console.log(
        'Mock Task API running on http://localhost:3000'
    );

});