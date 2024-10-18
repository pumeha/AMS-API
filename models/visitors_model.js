const BaseModel = require("./base_model");

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
     return this.knexInstance.select('status')
      .count('status as count')
      .where(props)
      .groupBy('status').timeout(this.timeout);
    }

    countPurpose(props){
     return this.knexInstance.select('purpose')
      .count('purpose as count')
      .where(props)
      .groupBy('purpose').timeout(this.timeout);
    }

    countFloor(props){
     return this.knexInstance.select('floorofinterest','status')
      .count('status as count')
      .where(props)
      .groupBy('floorofinterest','status').timeout(this.timeout);
    }

    getVisitorsFromAndTo(props){ 
     return this.knexInstance.select('*').whereBetween('day',[props.fromday,props.today])
      .andWhereBetween('month',[props.frommonth,props.tomonth])
      .andWhereBetween('year',[props.fromyear,props.toyear]).timeout(this.timeout);
    }

    


    


  
}
module.exports = VisitorModel;