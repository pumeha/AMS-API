const VisitorModel = require("../models/visitors_model");
const SurveyModel  = require('../models/survey_model');
const BaseController = require("./base_controller");
const VisitorController = require("./visitor_controller");

class SurveyController extends BaseController {
    constructor(req,res) {
        super(req,res);
    }

    async submitSurvey(){
        const props = this.req.body;
        const result = this.validateSurvey(props.satisfied,props.how_satisfied,props.reasons);

        if(result.length > 0) return this.errorResponse(404, `valid inputs required for ${result}`);

        const time = this.currentTime();

        if (props.satisfied == 'yes') {
            props.reasons = 'NA';
        }
        if (props.satisfied == 'no') {
            props.how_satisfied = 'NA';
        }

       const userExist = await new VisitorController().validateReceptionist(props.userid);
       if(userExist == 0) return this.errorResponse(404,'Receptionist is not found');
        
       const visitorExist = await this.validateVisitor(props.visitorid);
       if(visitorExist == 0) return this.errorResponse(404, 'Visitor is not found or Has Signout');
        
        
        Promise.all([
            new VisitorModel().update({visitorid : props.visitorid},{status:0,time_out:time}),
            new SurveyModel().create({visitorid:props.visitorid,
                satisfied: props.satisfied,how_satisfied :props.how_satisfied,reasons:props.reasons})
        ]).then(([visitorResult,surveyResult])=>{      
            return this.successResponse('success',{visitorResult,surveyResult},200);
        }).catch(err=>{
            console.log(err);
            return this.errorResponse(500,'Internal Server Error');
        });

    }

    async validateVisitor(visitorid){        
        if (typeof visitorid !== 'string' || !visitorid || visitorid.length != 28) {
            return 0;
        }
      return new VisitorModel().findOne({visitorid}).then(data =>{
            if(!data) return 0;
            return data['status'];
        }).catch(()=>{
            return 0;
        });
    }

    validateSurvey(satisfied,how_satisfied,reasons) {
        const errrors = [];
        
        if (typeof satisfied !== 'string' || (satisfied !== 'yes' && satisfied !== 'no')) {
         errrors.push('satisfied');
     }
             const validHow_satisfied = ['NA','1','2','3','4','5'];
         if (typeof how_satisfied !== 'string' ||  how_satisfied.includes(validHow_satisfied)) {
             errrors.push('how_satisfied');
         }
     
         if (typeof reasons !== 'string' || reasons.trim().length == 0 ) {
             errrors.push('reasons');
         }
         return errrors;
     }
}

module.exports = SurveyController;