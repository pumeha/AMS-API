const BaseModel = require("./base");

class UserModel extends BaseModel {
    constructor() {
        super('users',[
            'id','userid','firstname','lastname',
            'phonenumber','passcode','role',
            'created_at', 'updated_at'
        ]);   
    }

    

    

}