const { error, log } = require("console");
const express = require("express");
const knex = require("knex");
const db = knex(require("../knexfile").development); 
const router = express.Router();

router.post('/visitors/add',async (req,res) => {
    const {fullname,address,phonenumber,purpose,whotosee,floorofinterest,tagno,userid} = req.body;
    if (userid.length !== 28) {
        return res.status(404).json({error : 'user does exist'});
    }
    const status = validateInputs(fullname,address,phonenumber,purpose,whotosee,floorofinterest,tagno);
    if (status.length > 0) {
        return res.status(404).json({error: `Invalid input(s) for ${status}`});
    }

    db('users').select('id').where({userid}).then((id)=>{
        if (id === 0 ) {
            return res.status(404).json({error : 'user does exist'});
        }
        db('visitors').insert({fullname,address,phonenumber,purpose,whotosee,floorofinterest,tagno,userid})
        .then((id)=>{
            return res.status(201).json({message: 'success',id:id});
        }).catch((error)=>{
            return res.status(500).json({error: error.message});
        });


    });
    
});
router.get('/visitors',async (req,res) => {
    let {userid,fromday,frommonth,fromyear,today,tomonth,toyear} = req.query;
    
    fromday = Number(fromday);frommonth = Number(frommonth); fromyear = Number(fromyear);
    today = Number(today);tomonth = Number(tomonth); toyear = Number(toyear);
    
    
    const status = await checkUser(userid,res);
    if (status === 0 ) {
        return res.status(404).json({error: 'user does not exist'});
    }
    
    const date = validateDate(fromday,frommonth,fromyear,today,tomonth,toyear);
    if (date.length > 0 ) {
        return res.status(404).json({error: `${date} is/are not integers`});
    }
        
        
    if (fromday === 0 && today === 0 ) {

        frommonth = frommonth.toString(); tomonth = tomonth.toString();
        fromyear = fromyear.toString(); toyear = toyear.toString();
        console.log(frommonth);
        
      await  db('visitors').select('*')
        .whereBetween('month',[frommonth,tomonth])
        .andWhereBetween('year',[fromyear,toyear])
        .then(data=>{
            if (data.length === 0 ) {
                return res.status(200).json({message: 'no record found'});
            }
            return res.status(200).json({message: data});
        }).catch(error=>{
            return res.status(500).json({error: error.message});
        });
    }
    if (fromday != 0 && today != 0 ) {
    
        fromday = fromday.toString(); today = today.toString();
        frommonth = frommonth.toString(); tomonth = tomonth.toString();
        fromyear = fromyear.toString(); toyear = toyear.toString();
       
        
      await  db('visitors').select('*')
      .whereBetween('day',[fromday,today])
        .andWhereBetween('month',[frommonth,tomonth])
        .andWhereBetween('year',[fromyear,toyear])
        .then(data=>{
            if (data.length === 0 ) {
                return res.status(200).json({message: 'no record found'});
            }
            return res.status(200).json({message: data});
        }).catch(error=>{
            return res.status(500).json({error: error.message});
        });
    }

});
router.get('/visitors/today/:userid',async (req,res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const userid = req.params.userid;
    
        const result =  await checkUser(userid,res);
        if (result === 0) {
            return res.status(404).json({error : 'user does not exist'});
        }
        db('visitors').select('*').where({day,month,year}).then(data=>{
            if (data.length === 0) {
                return res.status(200).json({message: 'no record found'});
            }
            return res.status(200).json({message: data});
        })
        
    
});

    async function checkUser (userid,res) {
        let status;
    if (typeof userid !== 'string' || !userid || userid.length != 28) {
        return res.status(404).json({error: 'user does not exist'});
    }

   await db('users').select('id').where({userid}).first().then(id=>{
      
        
        if (id.length ===  0) {
            status = 0;
            console.log(id);
            return;
        }
        status = 1;
        return;

    }).catch((error)=>{
        return res.status(500).json({error: error.message});
    });

    return status;
}

function validateInputs(fullname,address,phonenumber,purpose,whotosee,floor,tagno) {
    const errrors = [];

    if (typeof fullname !== 'string' || !fullname) {
        errrors.push('fullname');
    }
    if (typeof address !== 'string' || !address) {
        errrors.push('address');
    }
    if (typeof phonenumber !== 'string' || !phonenumber) {
        errrors.push('phonenumber');
    }
    if (typeof purpose !== 'string' || !purpose) {
        errrors.push('purpose');
    }
    if (typeof whotosee !== 'string' || !whotosee) {
        errrors.push('whotosee');
    }
    if (typeof floor !== 'string' || !floor) {
        errrors.push('floor');
    }
    if (typeof tagno !== 'string' || !tagno) {
        errrors.push('tagno');
    }
        return errrors;
}

function validateDate(fromday,frommonth,fromyear,today,tomonth,toyear) {
    const errrors = [];

    if ( !Number.isInteger(fromday)) {
        errrors.push('fromday');
    }
    if ( !Number.isInteger(frommonth)) {
        errrors.push('frommonth');
    }
    if (!Number.isInteger(fromyear)) {
        errrors.push('fromyear');
    }
    if ( !Number.isInteger(today)) {
        errrors.push('today');
    }
    if ( !Number.isInteger(tomonth)) {
        errrors.push('tomonth');
    }
    if (!Number.isInteger(toyear)) {
        errrors.push('toyear');
    }

    return errrors;
}

module.exports = router;