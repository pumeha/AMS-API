const BaseModel = require("./base");

class VisitorModel extends BaseModel {
    constructor() {
      super('visitors',[
        'id','userid','visitorid','fullname',
        'address','phonenumber','purpose',
        'whotosee','floor1','floor2','floor3',
        'floor4','floor5','floorofinterest',
        'tagno','day','month','year','time_in',
        'time_out','status'
      ]);  
    }

  
}
module.exports = VisitorModel;