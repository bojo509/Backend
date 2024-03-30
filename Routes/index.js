import express from "express";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import companyRoute from "./companyRoutes.js";
import jobRoute from "./jobRoutes.js";

const router = express.Router();

router.use(`/auth`, authRoute);
router.use('/users', userRoute)
router.use('/companies', companyRoute)
router.use('/jobs', jobRoute)

export default router;