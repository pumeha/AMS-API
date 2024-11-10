const BaseModel = require("./base_model");

class SurveyModel extends BaseModel {
    constructor() {
       super('survey',[
        'id','visitorid','satisfied',
        'how_satisfied','reasons','created_at'
       ]); 
    }

    getSatisfiedVisitorsSurveyFromandTo(props){ 
        return this.knexInstance
        .join('visitors','survey.visitorid','=','visitors.visitorid')
        .where('satisfied','yes')
        .select('how_satisfied')
        .whereBetween('date',[props.from,props.to])
         .groupBy('how_satisfied')
         .count('how_satisfied as count')
         .timeout(this.timeout);
       }

     
}

module.exports  = SurveyModel;