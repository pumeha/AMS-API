const crypto = require('crypto');
class BaseController {
    
    constructor(req,res) {
        this.req = req;
        this.res = res;
    }

    successResponse(message,data,code){
        this.res.status(code).json({
            message : message,
            data : data || {}
        });
    }

    errorResponse(code,error){
        this.res.status(code).json({message:error});
    }

    generateUserId() {
        const length = 28; // Firebase user ID is 28 characters long
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let userId = '';
        const bytes = crypto.randomBytes(length);
        for (let i = 0; i < length; i++) {
            userId += characters[bytes[i] % characters.length];
        }
        return userId;
    } 
}

module.exports = BaseController;