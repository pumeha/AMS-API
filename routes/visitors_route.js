const express = require("express");
const router = express.Router();
const VisitorController = require('../controllers/visitor_controller');

router.post('/visitors/add',async (req,res) => {
  const controller = new VisitorController(req,res);
  await controller.registerVisitor();  
    
});

 router.get('/visitors',async (req,res) => {
  const controller = new VisitorController(req,res);
  await controller.getVisitors();
 });

router.post('/visitors/todaystatistics/',async (req,res) => {
  const controller = new VisitorController(req,res);
  await controller.getTodayStatistics();
 });

router.post('/visitors/signoutn',async (req,res) => {
    const controller = new VisitorController(req,res);
    await controller.signOutNonOfficialVisitor();

//     knexDb('visitors').where({visitorid}).update({status: 0,time_out: currentTime()}).then(()=>{
//             return res.status(200).json({message: 'Sign out'});
//     }).catch(error=>{
//             return res.status(500).json({error:error.message});
//     });



});

module.exports = router;