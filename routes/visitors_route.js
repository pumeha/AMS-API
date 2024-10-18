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
});

router.get('/visitors/today/:userid',async (req,res) => {
  const controller = new VisitorController(req,res);
  await controller.getTodayVisitors();
});

module.exports = router;