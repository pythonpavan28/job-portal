const mongoose = require("mongoose");

const allApplicationsSchema = new mongoose.Schema(
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





const AllApplicationModel = mongoose.model(
  "allApplications",
  allApplicationsSchema
);


module.exports = 
  AllApplicationModel

;
