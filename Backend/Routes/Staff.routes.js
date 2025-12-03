import express from "express";
import {
	addStudent,
	getAttendance,
	getStudent,
	getStudents,
	getPrivateGrievances,
	getPublicGrievances,
	markAttendence,
	removeStudent,
	saveAttendence,
	setPrivateGrievance,
	setPublicGrievance,
	updateClass,
} from "../Controllers/Staff.controller.js";
import StaffProtectRoute from "../Middlewares/Staff.middleware.js";
import {
	forgetPass,
	getStaff,
	resetPass,
} from "../Controllers/StaffAuth.controller.js";
import {
	getNotice,
	getNotices,
	uploadNotice,
} from "../Controllers/notice.controller.js";
// import {
// 	getTimeTable,
// 	uploadTimeTable,
// } from "../Controllers/TimeTable.controller.js";

const router = express.Router();

router.post("/addStudent", StaffProtectRoute, addStudent);
router.get("/getdetails", StaffProtectRoute, getStaff);

router.get("/getStudents", StaffProtectRoute, getStudents);
router.get("/getdetail/:id", StaffProtectRoute, getStudent);

router.post("/setclass/:id", StaffProtectRoute, updateClass);

router.get("/getpublicgrievance", StaffProtectRoute, getPublicGrievances);
router.get("/getprivategrievance", StaffProtectRoute, getPrivateGrievances);

router.post("/setpublicgrievance/:id", StaffProtectRoute, setPublicGrievance);
router.post(
	"/setprivategrievance/:id",
	StaffProtectRoute,
	setPrivateGrievance
);

router.post("/uploadnotice", StaffProtectRoute, uploadNotice);

// router.post("/uploadtimetable", StaffProtectRoute, uploadTimeTable);

router.get("/removeStudent/:id", StaffProtectRoute, removeStudent);

router.post("/saveattendance", StaffProtectRoute, saveAttendence);
router.post("/markattendance", StaffProtectRoute, markAttendence);

router.post("/attendanceof", StaffProtectRoute, getAttendance);

// router.get("/getTimeTable", getTimeTable);
router.get("/getnotices", StaffProtectRoute, getNotices);
router.get("/getnotice/:id", getNotice);

router.post("/forgetpass", forgetPass);
router.post("/resetpass", StaffProtectRoute, resetPass);

export default router;
