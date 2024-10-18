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

    countStatus(props){
      this.knexInstance.select('status')
      .count('status as count')
      .where(props)
      .groupBy('status');
    }

    countPurpose(props){
      this.knexInstance.select('purpose')
      .count('purpose as count')
      .where(props)
      .groupBy('propose');
    }

    countFloor(props){
      this.knexInstance.select('floorofinterest','status')
      .count('status as count')
      .where(props)
      .groupBy('floorofinterest','status');
    }


  
}
module.exports = VisitorModel;