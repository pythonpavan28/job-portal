const mongoose = require("mongoose");


const applicatonsSchmea = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    contactNumber: {
      type: Number,
      require: true,
    },
    aleternativeNumber: {
      type: Number,
    },
    address: {
      type: String,
      require: true,
    },
    education: {
      type: String,
    },
    skills: {
      type: [String],
    },
    experience: {
      type: Number,
    },
    currentCTC: {
      type: String,
    },
    expectedCTC: {
      type: String,
    },
    resume: {
      type: String,
      default: "",
      require: true,
    },
    status: {
      type: String,
      enum: ["shortlist", "reject", "hold"],
      default: "hold",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobsPost",
    },
    appliedfor: {
      type: String,
    },
  },
  { timestamps: true }
);

const jobsPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    jobDescription: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    jobType: {
      type: String,
      require: true,
    },
    jobRole: {
      type: String,
      require: true,
    },
    requiredSkills: {
      type: [String],
    },
    experience: {
      type: Number,
    },
    employmentType: {
      type: String,
      require: true,
    },
    lastDateToApply: {
      type: Date,
      require: true,
    },
    companyDetails: {
      type: String,
    },
    educationRequirements: {
      type: String,
    },
    salaryRange: {
      type: String,
    },
    applications: [applicatonsSchmea],
  },
  { timestamps: true }
);

const JobsPost = mongoose.model("jobspost", jobsPostSchema);


module.exports = JobsPost;
