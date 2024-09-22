const express = require("express");
const jobsRouter = express.Router();

const {
  PostJob,
  UpdateJobPost,
  DeleteJobPost,
  GetAllJobPosts,
  GetSingleJobPost,
  getAllJobApplication,
  getSingleApplicationforJobPost,
  ReviewApplicantion,
  AllShortListedApplicants,
  AllRejectedApplications,

  PreviousApplicationHistoryOfUsers,
 
} = require("../Controller/adminController");

jobsRouter.post("/upload/post", PostJob);//done
jobsRouter.put("/update/:id", UpdateJobPost);//done
jobsRouter.delete("/delete/:id", DeleteJobPost);//done
jobsRouter.get("/getalljobs", GetAllJobPosts);//done
jobsRouter.get("/getjob/:id", GetSingleJobPost);//done
jobsRouter.get("/all/applications",getAllJobApplication)//done
jobsRouter.get("/getapplication/:jobId/:userId",getSingleApplicationforJobPost)//done
jobsRouter.put("/review/:jobId/:userId", ReviewApplicantion);//done
jobsRouter.get("/shortlists", AllShortListedApplicants);//done
jobsRouter.get("/rejects", AllRejectedApplications);//done

jobsRouter.post("/user/history",PreviousApplicationHistoryOfUsers)//done


module.exports = jobsRouter;
