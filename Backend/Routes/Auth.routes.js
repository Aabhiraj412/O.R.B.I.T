import express from "express";
import {
	StaffLogin,
	StaffLogout,
	StaffRegisteration,
} from "../Controllers/StaffAuth.controller.js";
import {
	Studentlogin,
	Studentlogout,
} from "../Controllers/StudentAuth.controller.js";

const router = express.Router();

// Staff Routes
router.post("/Staffregistration", StaffRegisteration);
router.post("/Stafflogin", StaffLogin);
router.post("/Stafflogout", StaffLogout);

// Students Routes
router.post("/Studentlogin", Studentlogin);
router.post("/Studentlogout", Studentlogout);

export default router;
