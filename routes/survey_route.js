const express = require("express");
const SurveyController = require("../controllers/survey_controller");
const router = express.Router();

//i need to check whether the userid is a receptionist
router.post('/survey',async (req,res) => {
  const controller = new SurveyController(req,res);
  await controller.submitSurvey();
});


module.exports = router;