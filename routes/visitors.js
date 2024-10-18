const express = require("express");
const router = express.Router();
const VisitorController = require('../controllers/visitor_controller');

router.post('/visitors/add',async (req,res) => {
  const controller = new VisitorController(req,res);
  await controller.registerVisitor();  
    
});
// router.get('/visitors',async (req,res) => {
//     let {userid,fromday,frommonth,fromyear,today,tomonth,toyear} = req.query;
    
//     fromday = Number(fromday);frommonth = Number(frommonth); fromyear = Number(fromyear);
//     today = Number(today);tomonth = Number(tomonth); toyear = Number(toyear);
    
    
//     const status = await checkUser(userid,res);
//     if (status === 0 ) {
//         return res.status(404).json({error: 'user does not exist'});
//     }
    
//     const date = validateDate(fromday,frommonth,fromyear,today,tomonth,toyear);
//     if (date.length > 0 ) {
//         return res.status(404).json({error: `${date} is/are not integers`});
//     }
        
        
//     if (fromday === 0 && today === 0 ) {

//         frommonth = frommonth.toString(); tomonth = tomonth.toString();
//         fromyear = fromyear.toString(); toyear = toyear.toString();
//         console.log(frommonth);
        
//       await  knexDb('visitors').select('*')
//         .whereBetween('month',[frommonth,tomonth])
//         .andWhereBetween('year',[fromyear,toyear])
//         .then(data=>{
//             if (data.length === 0 ) {
//                 return res.status(200).json({message: 'no record found'});
//             }
//             return res.status(200).json({message: data});
//         }).catch(error=>{
//             return res.status(500).json({error: error.message});
//         });
//     }
//     if (fromday != 0 && today != 0 ) {
    
//         fromday = fromday.toString(); today = today.toString();
//         frommonth = frommonth.toString(); tomonth = tomonth.toString();
//         fromyear = fromyear.toString(); toyear = toyear.toString();
       
        
//       await  knexDb('visitors').select('*')
//         .whereBetween('day',[fromday,today])
//         .andWhereBetween('month',[frommonth,tomonth])
//         .andWhereBetween('year',[fromyear,toyear])
//         .then(data=>{
//             if (data.length === 0 ) {
//                 return res.status(200).json({message: 'no record found'});
//             }
//             return res.status(200).json({message: data});
//         }).catch(error=>{
//             return res.status(500).json({error: error.message});
//         });
//     }

// });
// router.get('/visitors/today/:userid',async (req,res) => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const day = today.getDate();
    
//     const userid = req.params.userid;
    
//         const result =  await checkUser(userid,res);
//         if (result === 0) {
//             return res.status(404).json({error : 'user does not exist'});
//         }
//         knexDb('visitors').select('*').where({day,month,year}).orderBy('id','desc').then(data=>{
//             if (data.length === 0) {
//                 return res.status(200).json({message: 'no record found'});
//             }
//         // console.log(data);
         
//         return res.status(200).json({message: data});
//         })
        
    
// });
router.post('/visitors/todaystatistics/',async (req,res) => {
  const controller = new VisitorController(req,res);
  await controller.getTodayStatistics();

 });

// router.post('/visitors/signoutn',async (req,res) => {
//     const {userid,visitorid} = req.body;
//     if (userid == null || visitorid == null) {
//         return res.status(404).json({error: 'invalid inputs'});
//     }
//    const status =  checkUser(userid,res);
//     if (status == 0) {
//         return res.status(404).json({error: 'user does not exist'});
//     }

//     if (typeof visitorid !== 'string' || visitorid.length != 28) {
//         return res.status(404).json({error: 'Visitor does not exist'});
//     }

//     knexDb('visitors').where({visitorid}).update({status: 0,time_out: currentTime()}).then(()=>{
//             return res.status(200).json({message: 'Sign out'});
//     }).catch(error=>{
//             return res.status(500).json({error:error.message});
//     });



// });

module.exports = router;