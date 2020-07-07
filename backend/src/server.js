const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(`${__dirname}/../uploads`));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message })
});

server.listen(3333, () => console.log('Servidor rodando'));