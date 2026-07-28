const express = require('express');

const app = express();

console.log('Server file started');

app.use(express.json());

let tasks = [];
let nextId = 1;

// POST /tasks
app.post('/tasks', (req, res) => {

    try {

        const { title, completed } = req.body;

        // 400 - Bad Request
        if (!title || typeof completed !== 'boolean') {
            return res.status(400).json({
                message: "Title and completed fields are required"
            });
        }

        // 409 - Conflict
        const existingTask = tasks.find(task => task.title === title);

        if (existingTask) {
            return res.status(409).json({
                message: "Task already exists"
            });
        }

        const task = {
            id: nextId++,
            title,
            completed
        };

        tasks.push(task);

        res.status(201).json(task);

    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        });
    }

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

    const { title, completed } = req.body;

    // 400
    if (!title || typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Title and completed fields are required"
        });
    }

    // 409
    const duplicate = tasks.find(
        t => t.title === title && t.id != req.params.id
    );

    if (duplicate) {
        return res.status(409).json({
            message: "Task already exists"
        });
    }

    task.title = title;
    task.completed = completed;

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

    tasks.splice(index, 1);

    // 204 - Success - No Content
    res.status(204).send();

});


// 405 - Method Not Allowed
app.all('/tasks', (req, res) => {

    res.status(405).json({
        message: "Method Not Allowed"
    });

});


// Test endpoint for 500
app.get('/error', (req, res) => {

    throw new Error("Test error");

});


// 404 - Unknown endpoint
app.use((req, res) => {

    res.status(404).json({
        message: "Endpoint not found"
    });

});


// Global Error Handler
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });

});

// TEST ONLY - Reset all tasks
//app.delete('/reset', (req, res) => {
//    tasks = [];
//    nextId = 1;
//    res.status(204).send();
//});

app.listen(3000, () => {

    console.log(
        'Mock Task API running on http://localhost:3000'
    );

});
