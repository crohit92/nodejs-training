const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const routes = require('./config/routes');
const port = 3300;

// routes(app);
app.use('/', routes);
app.listen(port, (err) => {
    if (!err) {
        // console.log("App is running at port:" + port);
        console.log(`App is running at port: ${port}`);
    } else {
        console.error(err);
    }
});
