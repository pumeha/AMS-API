const BaseController = require("./base_controller");
const crypto = require('crypto');
const User = require('../models/user');

class UserController extends BaseController {
    constructor(req,res) {
        super(req,res);
    }

    async createUser() {
        const props = this.req.body;

     const inputs = this.validateCreateInputs(props.firstname,props.lastname,
        props.phonenumber,props.passcode,props.role);
            if (inputs.length > 0) {
                return this.errorResponse(404,`invalid input(s) for ${inputs}`);
            }

            const userId = this.generateUserId(); 
            props.userId = userId;

            return new User().create(props).
            then(user =>{
                if (!user) return this.errorResponse(500,'failed to create user');  
                return this.successResponse('success',{id : user},201);   
            }).catch(error =>{
                if (error.code == 'ER_DUP_ENTRY') {
                   return this.errorResponse(500,'phone number already exists');
                }
             return this.errorResponse(500,'An error occurred while creating the user');   


            });

        }
        
    async login() {
        const props = this.req.body;
        const inputs = this.validateLoginInputs(props.phonenumber,props.passcode);
        if (inputs.length > 0) {
        return this.errorResponse(404,`invalid input(s) for ${inputs}`);    
        }
        return new User().findOne(props).then(data=>{
            if(!data) return this.errorResponse(404,'user does not exist');
            return this.successResponse('success',data['userid'],200);
        }).catch(()=>{
          return this.errorResponse(500, 'an error occurred while logging in');      
        });
    }
                
    validateLoginInputs(phonenumber,passcode) {
            const errrors = [];
            if (typeof phonenumber !== 'string' || !phonenumber || phonenumber.length != 11) {
                errrors.push('phonenumber');
            }
            if(typeof passcode !== 'string' || !passcode || passcode.length > 20){
                errrors.push('passcode');
            }
            return errrors;
        }  
        
    validateCreateInputs(firstname,lastname,phonenumber,passcode,role) {
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
}

module.exports = UserController;