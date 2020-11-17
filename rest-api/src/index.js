const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Todo = require('./todo.model');

app.use(
    cors({
        allowedHeaders: '*',
        origin: '*',
        methods: '*',
    })
);
app.use(bodyParser.json());
function authorize(req, res, next) {
    // Bearer sdkfdskfhdskjfhksjdfhksdj
    const token = (req.get('authorization') || '').split(' ')[1];
    if (token) {
        jwt.verify(token, 'MySecretKey', (err, decoded) => {
            if (err) {
                return res.status(401).json();
            } else if (decoded) {
                req.user = users.find((u) => u.id === decoded.id);
                next();
            } else {
                return res.status(401).json();
            }
        });
    } else {
        return res.status(401).json();
    }
}
const port = 3000;

const todos = [];
const users = [
    {
        id: 1,
        username: 'abc',
        password: '123',
        firstName: 'ABC',
        lastName: 'BCD',
    },
    {
        id: 2,
        username: 'def',
        password: '123',
        firstName: 'DEF',
        lastName: 'BCD',
    },
];
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

// app.post('/todos-find', (req, res, next) => {
//     const id = +req.body.id;
//     res.json(todos.find((t) => t.id === id));
// });
app.post('/authorize', (req, res) => {
    const credentials = req.body;
    const user = users.find(
        (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
    );
    if (user) {
        res.json(
            // `jashjksh.${credentials.username}:${credentials.password}.asjkdhakjdhask`
            jwt.sign({ id: user.id }, 'MySecretKey', {
                // expiresIn: '1m',
            })
        );
    } else {
        res.status(401).json();
    }
});
app.post('/todos', authorize, (req, res, next) => {
    // const id = todos.length + 1;
    // req.body.id = id;
    // todos.push(req.body);
    // const todo = new Todo({ title: "Title", description: "Description", isComplete: false });
    // const todo = new Todo(req.body);
    // // todo.save((err, newTodo) => {
    // //     if (err) {
    // //         return res.status(500).json(err);
    // //     }
    // //     res.json(newTodo);
    // // })
    // todo.save()
    //     .then((newTodo) => {
    //         res.json(newTodo);
    //     })
    //     .catch((err) => {
    //         return res.status(500).json(err);
    //     });
    Todo.create(req.body)
        .then((newTodo) => {
            res.json(newTodo);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

app.patch('/todos/:id', authorize, (req, res, next) => {
    // Todo.updateOne(
    //     { _id: mongoose.Types.ObjectId(req.params.id) },
    //     { $set: req.body }
    // )
    //     .then(() => {
    //         res.json();
    //     })
    //     .catch((err) => {
    //         res.status(500).json(err);
    //     });
    Todo.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        { $set: req.body }
    )
        .then((todo) => {
            res.json(Object.assign(todo, req.body));
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.get('/todos', (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(todos);
    });
});

app.get('/todos/:id', (req, res) => {
    res.json(todos.find((t) => t.id === +req.params.id));
});

app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex((t) => t.id === +req.params.id);
    if (index >= 0) {
        todos.splice(index, 1);
    }
    res.json();
});

mongoose
    .connect('mongodb://localhost:27017/merntraining', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(port, (err) => {
            if (!err) {
                // console.log("App is running at port:" + port);
                console.log(`App is running at port: ${port}`);
            } else {
                console.error(err);
            }
        });
    })
    .catch((err) => {});
