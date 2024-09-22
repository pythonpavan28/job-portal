const AllApplicationModel = require("../applicantsModel");
  const JobsPost = require("../adminJobPostModel");
  
  const nodemailer = require("nodemailer");
  const cron = require("node-cron");
//   const { start } = require("repl");
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ajaykumarthappeta119@gmail.com",
      pass: "aadh epxp ylpg rlnb",
    },
  });

  
  const PostJob = async (req, res) => {
    try {
      const {
        title,
        jobDescription,
        location,
        jobType,
        jobRole,
        requiredSkills,
        experience,
        employmentType,
        lastDateToApply,
        companyDetails,
        educationRequirements,
        salaryRange,
      } = req.body;
      console.log(req.body)
  
      const dateObject = new Date(lastDateToApply);
  
      // Set the time of the dateObject to the current time
      dateObject.setHours(new Date().getHours());
      dateObject.setMinutes(new Date().getMinutes());
  
      // Get the timestamp in milliseconds since the Unix Epoch
      const timestamp = dateObject.getTime();
  
      console.log("tisdfknmfdksnmsf,nlknf,m", timestamp);
  
      const post = new JobsPost({
        title,
        jobDescription,
        location,
        jobType,
        jobRole,
        requiredSkills,
        experience,
        employmentType,
        lastDateToApply: timestamp,
        companyDetails,
        educationRequirements,
        salaryRange,
      });
  
      await post.save();
      res
        .status(201)
        .json({ status: true, msg: "Post uploaded successfully", post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };
  
  const removeExpiredJobs = async (req, res) => {
    try {
      const now = Date.now();
      console.log("date now", now);
      const expiredJobs = await JobsPost.find({ lastDateToApply: { $lt: now } });
      console.log(expiredJobs);
  
      if (expiredJobs.length > 0) {
        await ExpiredJobPosts.insertMany(expiredJobs);
  
        const deleteJobsFromDb = await JobsPost.deleteMany({
          lastDateToApply: { $lt: now },
        });
        console.log("deleted Items", deleteJobsFromDb);
      } else {
        console.log("No Expire Job Found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  cron.schedule(`0 * * * *`, () => {
    removeExpiredJobs();
  });
  
  const UpdateJobPost = async (req, res) => {
    const { id } = req.params;
    try {
      const updateJobPost = await JobsPost.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateJobPost) {
        return res
          .status(403)
          .json({ status: false, msg: "job not found /invalid jobId" });
      }
      res.status(201).json({
        status: true,
        msg: "job post updated successfully",
        updateJobPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };
  
  const DeleteJobPost = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteJobPost = await JobsPost.findByIdAndDelete(id);
      if (!deleteJobPost) {
        return res.status(403).json({ msg: "job not found/invalid jobID" });
      }
      res
        .status(201)
        .json({ status: true, msg: "Job Post Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };
  
  const GetAllJobPosts = async (req, res) => {
    try {
      const allJobs = await JobsPost.find();
      const length = allJobs.length;
      res.status(201).json({ status: true, msg: "success", length, allJobs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };
  
  const GetSingleJobPost = async (req, res) => {
    const { id } = req.params;
    try {
      const singleJobPost = await JobsPost.findById(id);
      if (!singleJobPost) {
        return res
          .status(403)
          .json({ status: false, msg: "invalid jobId/Job not Found" });
      }
      res.status(201).json({
        status: true,
        msg: "success",
        singleJobPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };
  
  const getAllJobApplication = async (req, res) => {
    try {
      const allApplications = await AllApplicationModel.find();
      res.status(201).json({ msg: "success", data: allApplications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
  
  //doubt
  const getSingleApplicationforJobPost = async (req, res) => {
    const { jobId, userId } = req.params;
    try {
      const job = await JobsPost.findById(jobId);
      const application = job.applications.id(userId);
      res.status(201).json({ msg: "Success", application });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Sever Error" });
    }
  };
  
const ReviewApplicantion = async (req, res) => {
    const { jobId, userId } = req.params;
    const { status } = req.body;
  
    try {
      // Find and update the application status
      const updatedApplication = await AllApplicationModel.findOneAndUpdate(
        { jobId, _id: userId }, // Filter by jobId and userId
        { status }, // Update the status
        { new: true } // Return the updated document
      );
  
      if (!updatedApplication) {
        return res.status(404).json({ msg: "Application not found" });
      }
  
      res.status(200).json({
        status: true,
        msg: "Application status updated successfully",
        updatedApplication,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  

  

  
  const AllShortListedApplicants = async (req, res) => {
    try {
      const allShortListApplications = await AllApplicationModel.find({ status: 'shortlist' });
      res
        .status(201)
        .json({ status: true, msg: "success", allShortListApplications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Sever Error" });
    }
  };
  
  const AllRejectedApplications = async (req, res) => {
    try {
      const allRejectedApplications = await AllApplicationModel.find({ status: 'reject' });
      res
        .status(201)
        .json({ status: true, msg: "success", allRejectedApplications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  
  const PreviousApplicationHistoryOfUsers = async (req, res) => {
    const { email } = req.body;
    try {
      const userHistory = await AllApplicationModel.find({ email: email });
      if (!userHistory) {
        return res.status(401).json({ msg: "User Not Found" });
      }
      res.status(201).json({ msg: "success", userHistory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  

  

  
  module.exports = {
    PostJob,
    UpdateJobPost,
    DeleteJobPost,
    GetAllJobPosts,
    GetSingleJobPost,
    getAllJobApplication,
    getSingleApplicationforJobPost,

    AllShortListedApplicants,
    AllRejectedApplications,
    ReviewApplicantion,
    PreviousApplicationHistoryOfUsers,
  
  };
  