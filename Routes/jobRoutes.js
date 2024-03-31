import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJob, updateJob, deleteJobPost, getJobById, getJobPosts } from "../Controllers/jobController.js";

const router = express.Router();

//JWT required
router.post("/upload-job", userAuth, createJob);
router.put("/update-job/:id", userAuth, updateJob);
router.get("/get-all", getJobPosts)
router.get("/get-job-details/:id", getJobById)
router.delete("/delete-job/:id", deleteJobPost)

export default router