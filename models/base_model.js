const {knexDb} = require('../config/database');

class BaseModel{
    constructor(tableName,selectableProps,timeout = 1000){
        this.tableName = tableName;
        this.selectableProps = selectableProps;
        this.timeout = timeout;
        this.knexInstance = knexDb(tableName);
    }

    create(props){
        delete props.id;
        return this.knexInstance.insert(props).timeout(this.timeout);
    }

    findAll(){
        return this.knexInstance.select(this.props)
        .from(this.tableName).timeout(this.timeout);
    }

    find(filters){
        return this.knexInstance.select(this.props)
        .from(this.tableName).where(filters).timeout(this.timeout);
    }
    
    findOne(filters){
        return this.find(filters).then(results =>{
            if (!Array.isArray(results)) return results;
            return results[0];
        });

    }

    update(whereClause,props){
        delete props.id; //not allowed to set 'id'
        return this.knexInstance.update(props).from(this.tableName)
        .where(whereClause).timeout(this.timeout);
    }


}

module.exports = BaseModel;