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
    //add anytime a user is logged in regenerate the userid and update 
});

router.get('/users/:userid',async (req,res) => {
    const controller = new UserController(req,res);
    await controller.getUsers();
});

module.exports = router;