const BaseModel = require("./base_model");

class SurveyModel extends BaseModel {
    constructor() {
       super('survey',[
        'id','visitorid','satisfied',
        'how_satisfied','reasons','created_at'
       ]); 
    }
}

module.exports  = SurveyModel;