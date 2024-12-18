const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

router.get('/', userController.getAllUsers); // get all users
router.post('/', userMiddleware.createUserValidation ,userController.createUser); // create user
router.put('/:id', userMiddleware.updateUserValidation, userController.updateUser); // update user
router.get('/search', userController.searchUser); // search user
router.get('/:id', userController.getUserById); // get user by id
router.delete('/:id', userController.deleteUser); // delete user

module.exports = router;