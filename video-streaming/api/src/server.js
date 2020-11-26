const app = require('express')();
const routes = require('./config/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { join } = require('path');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');

app.use(
    cors({
        methods: '*',
        allowedHeaders: '*',
        origin: '*',
    })
);

dotenv.config({
    path: `${join(__dirname, '.env')}`,
});

app.use(bodyParser.json());
app.use('/', routes);

app.use((err, req, res, next) => {
    console.log('Error occured');
    console.log(err);
    res.status(500).json(err);
});
mongoose.connect(
    'mongodb://localhost:27017/video-streaming',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            const server = app.listen(3000, (err) => {
                console.log('App started on port 3000');
            });
            const peerServer = ExpressPeerServer(server, {
                debug: true,
                path: '/peerjs',
                key: 'peerjs',
                proxied: true,
                allow_discovery: true,
            });
            app.use(peerServer);
        } else {
            console.log(err);
        }
    }
);
