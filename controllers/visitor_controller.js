const BaseController = require("./base_controller");
const User = require('../models/user_model');
const Visitor = require('../models/visitors_model');

class VisitorController extends BaseController {
    constructor(req,res) {
        super(req,res);
    }

    async registerVisitor(){
        const props = this.req.body;
        
        const inputs =  this.validateVisitors(props.fullname,
            props.address,props.phonenumber,props.purpose,props.whotosee,
            props.floorofinterest,props.tagno
        );
        
        if(inputs.length > 0 ) return this.errorResponse(404,`Invalid input(s) for ${inputs}`);

        const receptionist = await this.validateReceptionist(props.userid);
        
        if(receptionist == 0) return this.errorResponse(404,'Receptionist does not exist');
            
        const visitorid = this.generateUserId();
        props.visitorid = visitorid;
        props.time_in = this.currentTime();
        
        props.year = this.todayYear();
        props.month = this.todayMonth();
        props.day = this.todayDay();

        return new Visitor().create(props).then(data=>{
            if(!data) return this.errorResponse(404,'failed to register visitor');
            return this.successResponse('success',data,201);
        }).catch((err)=>{
            console.log(err);
            return this.errorResponse(500,'Internal Server Error');
        });

    
    }

    async getVisitors(){

    const props = this.req.body;

     const date = this.validateDate(props.fromday,props.frommonth,props.fromyear,
        props.today,props.tomonth,props.toyear
     );   

     if(date.length > 0) return this.errorResponse(404,`invalid input(s) for ${date}`);

     const receptionist = await this.validateReceptionist(props.userid);
     
     if(receptionist == 0) return this.errorResponse(404,'receptionist does not exist');

      return new Visitor().getVisitorsFromAndTo(props).then(data=>{
     if(!data) return this.errorResponse(404,'an error occured while fetching');
       
        return this.successResponse('success',data,200);
        
     }).catch(err=>{
        console.log(err);
        return this.errorResponse(500,'Internal Server Error');
     });
    }

    async getTodayVisitors(){
     const {userid} = this.req.params;
     const status = await this.validateReceptionist(userid);

     if(status == 0 ) return this.errorResponse(404,'receptionist does not exist');
   
     return new Visitor()
     .find({day: this.todayDay(),month: this.todayMonth(),year:this.todayYear()})
     .then(data=>{
        if(!data) return this.errorResponse(404,'an error occurred while fetching');
        return this.successResponse('success',data,200);
     }).catch(err=>{
      console.log(err);
        return this.errorResponse(500,'Internal Server Error');
     });
    
        
    }

    async getTodayStatistics(){
        const props = {};
        const {userid} = this.req.body;
        const result = await this.validateReceptionist(userid);

        if(result == 0) return this.errorResponse(404,'receptionist does not exist');
        props.year = this.todayYear();
        props.month = this.todayMonth();
        props.day = this.todayDay();

        Promise.all([
            new Visitor().countStatus(props),
            new Visitor().countPurpose(props),
            new Visitor().countFloor(props)
        ]).then(([statusResults,purposeResults,floorResults])=>{
            return this.successResponse('success',{statusResults,purposeResults,floorResults},200);
        }).catch((err)=>{
            console.log(err);
            return this.errorResponse(500,'Internal Server Error');
        });
        
    }

    async signOutNonOfficialVisitor(){
        const props = this.req.body;
        const inputs = this.validateNonSignOut(props.visitorid,props.userid);
        if(inputs.length > 0) return this.errorResponse(404,`invalid inputs for ${inputs}`);

        const time = this.currentTime();
        
        const result = await this.validateReceptionist(props.userid);
        if(result == 0) return this.errorResponse(404,'receptionist does not exist');

        return new Visitor().update({visitorid:props.visitorid},
            {status:0,time_out:time}).then(data =>{
                if(!data) return this.errorResponse(404,'an error occurred while updating');
               return this.successResponse('success',data,200);
                
        }).catch(err =>{
            console.log(err);
            return this.errorResponse(500,'Internal Server Error');
        });

    }

    async validateReceptionist(userid){        
        if (typeof userid !== 'string' || !userid || userid.length != 28) {
            return 0;
        }
      return new User().findOne({userid}).then(data =>{
            if(!data) return 0;
            return 1;
        }).catch(()=>{
            return 0;
        });
    }

    validateVisitors(fullname,address,phonenumber,purpose,whotosee,floor,tagno) {
        const errrors = [];
    
        if (typeof fullname !== 'string' || !fullname) {
            errrors.push('fullname');
        }
        if (typeof address !== 'string' || !address) {
            errrors.push('address');
        }
        if (typeof phonenumber !== 'string' || !phonenumber) {
            errrors.push('phonenumber');
        }
        if (typeof purpose !== 'string' || !purpose) {
            errrors.push('purpose');
        }
        if (typeof whotosee !== 'string' || !whotosee) {
            errrors.push('whotosee');
        }
        if (typeof floor !== 'string' || !floor) {
            errrors.push('floor');
        }
        if (typeof tagno !== 'string' || !tagno) {
            errrors.push('tagno');
        }
            return errrors;
    }

    validateDate(fromday,frommonth,fromyear,today,tomonth,toyear) {
        const errrors = [];
    
        if ( !Number.isInteger(fromday)) {
            errrors.push('fromday');
        }
        if ( !Number.isInteger(frommonth)) {
            errrors.push('frommonth');
        }
        if (!Number.isInteger(fromyear)) {
            errrors.push('fromyear');
        }
        if ( !Number.isInteger(today)) {
            errrors.push('today');
        }
        if ( !Number.isInteger(tomonth)) {
            errrors.push('tomonth');
        }
        if (!Number.isInteger(toyear)) {
            errrors.push('toyear');
        }
    
        return errrors;
    }

    validateNonSignOut(visitorid,userid){

        const error = [];
        if (!visitorid || typeof visitorid !== 'string' || visitorid.length !== 28 ) {
            error.push('visitor');
        }
        if(!userid || typeof userid !== 'string' || userid.length !== 28) {error.push('receptionist');}

        return error;
    }
}

module.exports = VisitorController;