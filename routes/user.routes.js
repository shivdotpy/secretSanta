const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/addOne', userController.addOneUser);

router.post('/addMany', userController.addmanyUser);

router.get('/getAll', userController.getAllUsers);

router.get('/execute', userController.execute);

router.post('/getMySecretSanta', userController.getMySecretSanta);

module.exports = router;
