const JobModel = require("../models/job");

// functions
const createJob = async (req, res) => {
    try {
        const jobObj = req.body;
        const newJob = new JobModel(jobObj);
        const newlySavedJob = await newJob.save();
        // console.log(newlySavedJob);
        //   console.log(req.body);
        res.json({
          success: true,
          message: "Job created successfully",
          jobId: newlySavedJob._id,
        });
      } catch (err) {
        res.json({
          success: false,
          message: "Something went wrong, please try again after sometime",
        });
      }
    };

const listJob = async (req, res) => {
    try {
        const { minSalary, maxSalary } = req.query;
        const jobsList = await JobModel.find({
          $and: [{ salary: { $gte: minSalary } }, { salary: { $lte: maxSalary } }],
        });
          console.log(jobsList);
        res.json({
          success: true,
          message: "Job Data Fetch Successfully !",
          results: jobsList,
        });
      } catch (err) {
        res.json({
          success: false,
          message: "Something went wrong, please try again after sometime",
        });
      }
};

const editJob = async (req, res) => {
    try{
        const jobId = req.params.id;
        console.log(jobId);
        console.log(req.body);
        await JobModel.findByIdAndUpdate(jobId, req.body);
        res.status(200).json({
            message: "Job Update successfully !",
        })
    }catch(error){
        console.log(error);

        res.status(500).json({
            error : "SOMETHING WENT WRONG"
        });
    }
};

const deleteJob = async (req, res) => {
    try{
        const jobId = req.params.id 
        await JobModel.findByIdAndDelete(jobId)
        res.status(200).json({
            message: "Job Delete successfully ! "
        })
    }catch(error){
        console.log(error);

        res.status(500).json({
            error : "SOMETHING WENT WRONG"
        });
    }
};

const jobController = {
    createJob,
    listJob,
    editJob,
    deleteJob,
};

module.exports = jobController;