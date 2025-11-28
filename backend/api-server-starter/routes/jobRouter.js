const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");

// GET /jobs
router.get("/", getAllJobs);

// POST /jobs
router.post("/", createJob);

// GET /jobs/:jobId
router.get("/:jobId", getJobById);

// PUT /jobs/:jobId
router.put("/:jobId", updateJob);

// DELETE /jobs/:jobId
router.delete("/:jobId", deleteJob);

// Update blog using PATCH 
// router.patch('/:blogId', patchBlog)

module.exports = router;