const express = require('express');
const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const upload = multer(multerConfig);

routes.get('/users', UserController.show);
routes.post('/user', upload.single('picture'), UserController.create);
routes.post('/login', UserController.index);
routes.put('/user/:id', upload.single('picture'), UserController.update);

routes.post('/service', ServiceController.create);
routes.get('/service', ServiceController.index);
routes.post('/services/:id', ServiceController.show);
routes.put('/service-confirm/:id', ServiceController.update);
routes.delete('/service/:id', ServiceController.delete);

module.exports = routes;