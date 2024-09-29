const { error } = require("console");
const express = require("express");
const knex = require("knex");
const router = express.Router();
const db = knex(require('../knexfile').development);
const crypto = require('crypto');

router.post('/users/add',async (req,res) => {
    const {firstname,lastname,phonenumber,passcode,role} = req.body;
    
    const inputs = validateInputss(firstname,lastname,phonenumber,passcode,role);
    if (inputs.length > 0) {
        return res.status(404).json({error: `invalid input(s) for ${inputs}`});
    }
    const userId = generateUserId();
    db('users')
    .insert({userId,firstname,lastname,phonenumber,passcode,role})
    .then((id)=>{
        return res.status(201).json({message: 'Success',userId: userId,id:id});
    }).catch((error)=>{
        return res.status(500).json({error : error.message});
    });
});

router.post('/users/login',async (req,res) => {
    const {phonenumber,passcode} = req.body;
    const inputs = validateInputs(phonenumber,passcode);
    
    if (inputs.length > 0) {
        return res.status(404).json({error: `invalid input(s) for ${inputs}`});
    }
        db('users').select('userid','role').where({phonenumber,passcode}).first().then((data)=>{
            if (data.length === 0) {
             return  res.status(404).json({error: 'invalid user'});
            }
            return res.status(201).json(data);
        }).catch((error)=>{
            return res.status(500).json({error: error.message});
        });

});

function validateInputss(firstname,lastname,phonenumber,passcode,role) {
    const errrors = [];

    if ( typeof firstname !== 'string' || !firstname || firstname.length >49) {
        errrors.push('firstname');
    }
    if (typeof lastname !== 'string' || !lastname || lastname.length > 49) {
        errrors.push('lastname');
    }
    if (typeof phonenumber !== 'string' || !phonenumber || phonenumber.length !== 11) {
        
        
        errrors.push('phonenumber');
    }
    if(typeof passcode !== 'string' || !passcode || passcode.length > 20){
        errrors.push('passcode');
    }
    if (typeof role !== 'string' || !role || role.length > 20) {
        errrors.push('role');
    }
    
    return errrors;
}

function validateInputs(phonenumber,passcode) {
    const errrors = [];

    if (typeof phonenumber !== 'string' || !phonenumber || phonenumber.length != 11) {
        errrors.push('phonenumber');
    }
    if(typeof passcode !== 'string' || !passcode || passcode.length > 20){
        errrors.push('passcode');
    }

    return errrors;
}

function generateUserId() {
    const length = 28; // Firebase user ID is 28 characters long
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let userId = '';
    const bytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        userId += characters[bytes[i] % characters.length];
    }

    return userId;
}

module.exports = router;