import express from "express";
import StudentProtectRoute from "../Middlewares/Student.middleware.js";
import { getStudent } from "../Controllers/StudentAuth.controller.js";

const router = express.Router();

router.get("/getdetails", StudentProtectRoute, getStudent);

export default router;