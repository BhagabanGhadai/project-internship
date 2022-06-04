const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");

/********************************************************************Create College Api*******************************************************/

const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}

const createCollege = async function (req, res) {

  try {

    let data = req.body;  /*we take Input Here and check all the field and value*/

    if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Enter The College Details!", });

    if (!isValid(data.name)) return res.status(400).send({ status: false, msg: "Please Enter The College Name(in Short form)" });

    if (!isValid(data.fullName)) return res.status(400).send({ status: false, msg: "Enter the FullName of the College", });

    if (!isValid(data.logoLink)) return res.status(400).send({ status: false, msg: "Please Enter The logoLink Of The College", });

    const Name = data.name.toLowerCase().trim()

    let checkCollegeName = await collegeModel.findOne({ name: Name }); /*Check College Name From DB*/

    if (checkCollegeName) return res.status(400).send({ status: false, msg: "College Name Already Exists" });

    if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.logoLink))

    return res.status(400).send({ status: false, msg: `${data.logoLink} is not a valid URL` }) /*validate URL */

    data.name = Name; /*Re-Assign the Name in data Object */

    let createdCollege = await collegeModel.create(data);  /*Create College Here*/

    res.status(201).send({ status: true, msg: "College Created Successfully", data: createdCollege });

  } catch (err) {

    res.status(500).send({ status: false, error: err.message });
  }
};


/*********************************************************GET COLLEGE AND INTERN DETAILS*******************************************************/

const getCollegeDetails = async function (req, res) {

  try {

    let data = req.query   /*we take Input Here and check all the field and value*/

    if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Enter The College Name", });

    const lowerCollegeName = data.collegeName.toLowerCase();

    let checkCollegeName = await collegeModel.findOne({ name: lowerCollegeName, isDeleted: false }) /*Check College Name From DB*/

    if (!checkCollegeName) return res.status(404).send({ status: false, msg: "No such college Name found", });

    let collegeId = checkCollegeName._id /*Get CollegeID from CheckCollegeName*/

    let getAllInternData = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })

    if (!getAllInternData.length) return res.status(404).send({ status: false, msg: "No intern Apply for This College", });

    /*Assign Value*/
    let name = checkCollegeName.name;
    let fullName = checkCollegeName.fullName;
    let logoLink = checkCollegeName.logoLink;

    /*Create a CollegeData Object Here*/
    let collegeData = {
      name: name,
      fullName: fullName,
      logoLink: logoLink,
      interests: getAllInternData
    }

    res.status(200).send({ status: true, msg: "Successful", data: collegeData });

  }

  catch (err) {

    res.status(500).send({ status: false, error: err.message });

  }
}

module.exports = { createCollege, getCollegeDetails };
