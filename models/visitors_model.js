const { knexDb } = require("../config/database");
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

    countStatusFromandTo(props){
      return  this.knexInstance.select('status')
      .count('status as count')
      .whereBetween('day',[props.fromday,props.today])
      .andWhereBetween('month',[props.frommonth,props.tomonth])
      .andWhereBetween('year',[props.fromyear,props.toyear])
      .groupBy('status').timeout(this.timeout);
    }

    countPurpose(props){
     return this.knexInstance.select('purpose')
      .count('purpose as count')
      .where(props)
      .groupBy('purpose').timeout(this.timeout);
    }

    countPurposeFromandTo(props){
      return this.knexInstance.select('purpose')
      .count('purpose as count')
      .whereBetween('day',[props.fromday,props.today])
      .andWhereBetween('month',[props.frommonth,props.tomonth])
      .andWhereBetween('year',[props.fromyear,props.toyear])
      .groupBy('purpose').timeout(this.timeout);
    }

    countFloor(props){
     return this.knexInstance.select('floorofinterest','status')
      .count('status as count')
      .where(props)
      .groupBy('floorofinterest','status').timeout(this.timeout);
    }

    countFloorFromandTo(props){
      return this.knexInstance.select('floorofinterest','status')
      .count('status as count')
      .whereBetween('day',[props.frommonth,props.today])
      .andWhereBetween('month',[props.frommonth,props.tomonth])
      .andWhereBetween('year',[props.fromyear,props.toyear])
      .groupBy('floorofinterest','status').timeout(this.timeout);
    }

    getVisitorsFromAndTo(props){ 
     const visitorsColumns = ['fullname','address','visitors.phonenumber','purpose',
      'whotosee','floorofinterest','tagno','day','month','year','time_in',
      'time_out','status'
     ];
     
     return this.knexInstance 
     .join('users','visitors.userid','=','users.userid') 
     .join('survey','visitors.visitorid','=','survey.visitorid') 
     .select(knexDb.raw("CONCAT(users.firstname,' ', users.lastname,'-',users.phonenumber) AS createdby"),
      ...visitorsColumns,'satisfied','how_satisfied','reasons').whereBetween('day',[props.fromday,props.today])
      .andWhereBetween('month',[props.frommonth,props.tomonth])
      .andWhereBetween('year',[props.fromyear,props.toyear]).timeout(this.timeout);
    }

    findByFullnameContains(substring) {      
      return this.knexInstance
          .select('*')
          .from(this.tableName)
          .where('fullname', 'like', `%${substring}%`) 
          .orderBy('id', 'desc')
          .timeout(this.timeout);
  }

    


    


  
}
module.exports = VisitorModel;