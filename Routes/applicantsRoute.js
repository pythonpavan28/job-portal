const express = require("express")

const userApplyRouter = express.Router()

const ApplyForJob = require("../Controller/userapplyController")

userApplyRouter.post("/apply/job/:jobId",ApplyForJob) //done

module.exports = userApplyRouter