const BaseController = require("./base_controller");
const User = require('../models/user_model');
const VisitorController = require("./visitor_controller");

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
             return this.errorResponse(500,'Internal Server Error');   


            });

        }
        
    async login() {
        const props = this.req.body;
        const inputs = this.validateLoginInputs(props.phonenumber,props.passcode);
        if (inputs.length > 0) {
        return this.errorResponse(404,`invalid input(s) for ${inputs}`);    
        }
        return new User().findOne({"phonenumber":props.phonenumber}).then(data=>{
            if(!data) return this.errorResponse(404,'user does not exist');
           if (data['passcode'] == props.passcode) {
            return this.successResponse('success',{userid: data['userid'],role: data['role']},200);
           }else{
            return this.errorResponse(404,'invalid phonenumber or passcode');
           }
        }).catch(()=>{
          return this.errorResponse(500, 'Internal Server Error');      
        });
    }

    async getUsers(){
        const userid = this.req.params;
        const validateUser = await new VisitorController().validateReceptionist(userid['userid']);  
          
        if (validateUser !== 2) {
            return this.errorResponse(404,'Access Denied');
        }
        new User().findAll().then(data=>{
        return this.successResponse('Success',data,200);
        }).catch(err=>{
            console.log(err);
            return this.errorResponse(500,'Internal Server Error');
        })
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