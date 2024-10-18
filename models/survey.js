const BaseModel = require("./base");

class SurveyModel extends BaseModel {
    constructor() {
       super('survey',[
        'id','visitorid','satisfied',
        'how_satisfied','reasons','created_at'
       ]); 
    }
}

module.exports  = SurveyModel;