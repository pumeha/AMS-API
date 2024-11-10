const { knexDb } = require("../config/database");
const BaseModel = require("./base_model");

class VisitorModel extends BaseModel {
    constructor() {
      super('visitors',[
        'id','userid','visitorid','fullname',
        'address','phonenumber','purpose',
        'whotosee','floorofinterest',
        'tagno','date','time_in',
        'time_out','status','created_at'
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
      .whereBetween('date',[props.from,props.to])
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
      .whereBetween('date',[props.from,props.to])
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
      .whereBetween('date',[props.from,props.to])
      .groupBy('floorofinterest','status').timeout(this.timeout);
    }

    getVisitorsFromAndTo(props){ 
     const visitorsColumns = ['fullname','address','visitors.phonenumber','purpose',
      'whotosee','floorofinterest','tagno','date','time_in',
      'time_out','status'
     ];
     
     return this.knexInstance 
     .join('users','visitors.userid','=','users.userid') 
     .join('survey','visitors.visitorid','=','survey.visitorid') 
     .select(knexDb.raw("CONCAT(users.firstname,' ', users.lastname,'-',users.phonenumber) AS createdby"),
      ...visitorsColumns,'satisfied','how_satisfied','reasons')
      .whereBetween('date',[props.from,props.to])
      .timeout(this.timeout);
    }

    findByFullnameContains(substring) {      
      return this.knexInstance
          .select('*')
          .from(this.tableName)
          .where('fullname', 'like', `%${substring}%`) 
          .orderBy('id', 'desc')
          .timeout(this.timeout);
  }

  getTodaySatisfiedVisitorsSurvey(props){ 
    const filteredVisitors = this.knexInstance
     .select('visitorid')
     .where(props);

 return knexDb('survey')
     .whereIn('visitorid', filteredVisitors)
     .where('satisfied', 'yes')
     .select('how_satisfied')
     .groupBy('how_satisfied')
     .count('how_satisfied as count')
     .timeout(this.timeout);
 
    }

    


    


  
}
module.exports = VisitorModel;