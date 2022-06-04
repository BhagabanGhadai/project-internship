const express = require("express");
const router = express.Router();
const collegeControllers = require("../controllers/collegeController");
const internControllers = require("../controllers/internController");



router.post("/colleges", collegeControllers.createCollege);
router.post("/interns", internControllers.createIntern);
router.get('/collegeDetails',collegeControllers.getCollegeDetails)


module.exports = router;
