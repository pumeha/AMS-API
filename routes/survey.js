const express = require("express");
const {knexDb}  = require('../config/database');
const router = express.Router();

//i need to check whether the userid is a receptionist
router.post('/survey',async (req,res) => {
    let { visitorid,satisfied,how_satisfied,reasons} = req.body;
    const _data = checkinputs(satisfied,how_satisfied,reasons);
    if (_data.length > 0) {
        return res.status(404).json({error: `invalid inputs for ${_data}`});
    }
    if (satisfied == 'yes') {
        reasons = 'NA';
    }
    if (satisfied == 'no') {
        how_satisfied = 'NA';
    }
    const result = await checkvisitor(visitorid,res);
    
    if (result === 0) {
        return res.status(404).json({error: 'user does not exist'});
    }
    knexDb('survey').insert({visitorid,satisfied,how_satisfied,reasons}).then(id =>{
        if (id.length === 0 ) {
            return res.status(404).json({error: 'an error occur will inserting'});
        }
        return res.status(201).json({message: 'success'});
    });
});
//checking if user exist
async function checkvisitor(visitorid,res) {
    let result;
    if(typeof visitorid !== 'string' || visitorid.length !== 28){
        return res.status(404).json({error: 'visitor does not exist'});
    }

   await knexDb('visitors').select('id').where({visitorid}).first().then((id)=>{
    

        if (id.length === 0) {
            result = 0; 
         return;    
        }
        result = 1;
      return;
    }).catch(()=>{
        result = 0; 
        return;
    });
   return result;
}
//validate inputs...
function checkinputs(satisfied,how_satisfied,reasons) {
   const errrors = [];
   
   if (typeof satisfied !== 'string' || (satisfied !== 'yes' && satisfied !== 'no')) {
    errrors.push('satisfied');
}
        const validHow_satisfied = ['NA','1','2','3','4','5'];
    if (typeof how_satisfied !== 'string' ||  how_satisfied.includes(validHow_satisfied)) {
        errrors.push('how_satisfied');
    }

    if (typeof reasons !== 'string' || reasons.trim().length == 0 ) {
        errrors.push('reasons');
    }
    return errrors;
}



module.exports = router;