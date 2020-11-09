const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// app.use(require('./middlewares/auth-guard'));
app.use(bodyParser.json());
app.use('/', require('./config/routes'));

app.use((err, req, res, next) => {
    console.log('Error occured');
    res.status(500).json(err);
});
app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});
