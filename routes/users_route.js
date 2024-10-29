const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller');


router.post('/users/add',async (req,res) => {
    const controller = new UserController(req,res);
   await controller.createUser();
});

router.post('/users/login',async (req,res) => {
    const controller = new UserController(req,res);
    await controller.login();
});

router.get('/users/:userid',async (req,res) => {
    const controller = new UserController(req,res);
    await controller.getUsers();
});

module.exports = router;