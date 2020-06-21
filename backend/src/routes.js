const express = require('express');
const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const upload = multer(multerConfig);

routes.get('/users', UserController.show);
routes.post('/user', upload.single('picture'), UserController.create);
routes.post('/login', UserController.login);
routes.put('/user/:id', upload.single('picture'), UserController.update);

routes.post('/service', ServiceController.create);
routes.get('/service', ServiceController.index);
routes.put('/service-confirm/:id', ServiceController.confirm);
routes.put('/service-start/:id', ServiceController.start);
routes.put('/service-hire/:id', ServiceController.hire);
routes.put('/service-finish/:id', ServiceController.finish);
routes.put('/service-pick-up-device/:id', ServiceController.pickUpDevice);
routes.delete('/service/:id', ServiceController.delete);

module.exports = routes;