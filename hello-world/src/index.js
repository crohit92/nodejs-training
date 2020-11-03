const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const user = {
        name: 'Rohit',
        lastName: 'Chopra',
    };
    res.json(user);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
