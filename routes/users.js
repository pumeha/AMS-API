const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user_controller');


router.post('/users/add',async (req,res) => {
    const controller = new UserController(req,res);
   await controller.createUser();
});

// router.post('/users/login',async (req,res) => {
//     const {phonenumber,passcode} = req.body;
//     const inputs = validateInputs(phonenumber,passcode);
    
//     if (inputs.length > 0) {
//         return res.status(404).json({error: `invalid input(s) for ${inputs}`});
//     }
//         knexDb('users').select('userid','role').where({phonenumber,passcode}).first().then((data)=>{
//             if (data.length === 0) {
//              return  res.status(404).json({error: 'invalid user'});
//             }
//             return res.status(201).json(data);
//         }).catch((error)=>{
//            if (error.message == "Cannot read properties of undefined (reading 'length')") {
//             return  res.status(404).json({error: 'user does not exist'});
//            }
//             return res.status(500).json({error: error.message});
//         });

// });

module.exports = router;