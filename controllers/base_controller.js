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

    currentTime() {
        const  currentDate = new Date();
    let hours = currentDate.getHours();
    const AmPm = hours >= 12 ? 'PM' : 'AM';
    //convert hours to 12-hour format
    hours = hours % 12 || 12;
    const time = hours + ':'+ String(currentDate.getMinutes()).padStart(2, '0') + ' ' + AmPm;
    return time;
    }
}

module.exports = BaseController;