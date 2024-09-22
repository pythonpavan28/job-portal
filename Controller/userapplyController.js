const JobsPost = require("../adminJobPostModel");
const  AllApplicationModel = require("../applicantsModel");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ajaykumarthappeta119@gmail.com",
    pass: "aadh epxp ylpg rlnb",
  },
});

const sendSuccessEmail = (email, title) => {
  const mailOptions = {
    from: "ajaykumarthappeta119@gmail.com",
    to: email,
    subject: "You Have Applied Successfully",
    text: `You have applied for the job for the ${title} role at Monosage.com.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

const ApplyForJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await JobsPost.findById(jobId);
    if (!job) {
      return res.status(403).json({ msg: "Invalid job post" });
    }

    const existingApplication = job.applications.find(
      (item) => item.email === req.body.email
    );
    if (existingApplication) {
      return res.status(403).json({ msg: "You have already applied for this job" });
    }

    const newApplication = {
      _id: new mongoose.Types.ObjectId(),
      jobId: job._id,
      appliedfor: job.title,
      fullName: req.body.fullName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      alternativeNumber: req.body.alternativeNumber,
      address: req.body.address,
      education: req.body.education,
      skills: req.body.skills,
      experience: req.body.experience,
      currentCTC: req.body.currentCTC,
      expectedCTC: req.body.expectedCTC,
      resume: req.body.resume, 
    };

    job.applications.push(newApplication);
    await job.save();

    const saveInAllApplications = new AllApplicationModel(newApplication);
    await saveInAllApplications.save();

    sendSuccessEmail(req.body.email, job.title);
    res.status(201).json({
      length: job.applications.length,
      applications: job.applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = ApplyForJob;
