const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 3300;

const todos = [];

/**
 * Todo model
 *
 * Properties:
 *
 * id: number;
 * title: string;
 * description: string;
 * isComplete: boolean;
 */
/**
 * Operations:
 *
 * Insert/Create
 * Update
 * Read All
 * Read One
 * Delete
 */

app.post('/todos-find', (req, res, next) => {
    const id = +req.body.id;
    res.json(todos.find((t) => t.id === id));
});

app.post('/todos', (req, res, next) => {
    const id = todos.length + 1;
    req.body.id = id;
    todos.push(req.body);
    res.json(req.body);
});

app.patch('/todos/:id', (req, res, next) => {
    console.log(req.params.id);
    const existingTodo = todos.find((todo) => {
        return todo.id === +req.params.id;
    });
    if (!existingTodo) {
        res.status(404).json();
    } else {
        Object.assign(existingTodo, req.body);
        res.json(existingTodo);
    }
});

app.get('/todos/:id', (req, res) => {
    res.json(todos.find((t) => t.id === +req.params.id));
});

app.listen(port, (err) => {
    if (!err) {
        // console.log("App is running at port:" + port);
        console.log(`App is running at port: ${port}`);
    } else {
        console.error(err);
    }
});
