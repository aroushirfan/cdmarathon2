const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const requireAuth= require("../middleware/requireAuth");

// GET /jobs
router.get("/", getAllJobs);

// GET /jobs/:jobId
router.get("/:jobId", getJobById);

router.use(requireAuth);
// POST /jobs
router.post("/", createJob);

// PUT /jobs/:jobId
router.put("/:jobId", updateJob);

// DELETE /jobs/:jobId
router.delete("/:jobId", deleteJob);

// Update blog using PATCH 
// router.patch('/:blogId', patchBlog)

module.exports = router;