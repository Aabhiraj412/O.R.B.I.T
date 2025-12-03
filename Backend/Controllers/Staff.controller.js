import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

import Student from "../Schemas/Student.model.js";
import PrivateGrivance from "../Schemas/PrivateGrivance.model.js";
import PublicGrivance from "../Schemas/PublicGrivance.model.js";
import Attendance from "../Schemas/Attendance.model.js";

export const getStudents = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff) {
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });
		}
        const Students = await Student.find().sort({ roll_no: 1 });
		res.status(200).json(Students);
		console.log("Students details fetched successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const getStudent = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const id = req.params.id;

		const Student = await Student.findById(id);

		if (!Student) {
			return res.status(404).json({ message: "Student not found" });
		}

		res.status(200).json(Student);
		console.log("Student details fetched successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const updateClass = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const { classroom } = req.body;

		if (!classroom)
			return res.status(400).json({ message: "Invalid Details" });

		const id = req.params.id;

		const Student = await Student.findById(id);

		if (Student.classroom === classroom)
			return res.status(400).json({ message: "Classroom not changed" });

		const pre = {
			classroom: Student.classroom,
		};

		Student.classroom = classroom;

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.Email,
				pass: process.env.Pass,
			},
		});

		const mailOptions = {
			from: process.env.Email,
			to: Student.email,
			subject: "Classroom Updated",
			text: `Hello ${Student.name},

Your classroom has been updated to form ${pre.classroom} to ${classroom}. 

Please check your Classroom details.

Thank you.
Regards,
College Management System`,
		};

		try {
			const emailResponse = await new Promise((resolve, reject) => {
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) reject(error);
					else resolve(info.response);
				});
			});
			console.log("Email sent:", emailResponse);
		} catch (emailError) {
			console.error("Failed to send email:", emailError.message);
			return res.status(500).json({ error: "Failed to send email." });
		}

		await Student.save();

		res.status(200).json(Student);
		console.log("Room updated successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const getPublicGrievances = async (req, res) => {
	try {
		const grievances = await PublicGrivance.find({}).sort({ date: -1 });
		res.status(200).json(grievances);
		console.log("Public Grievances fetched successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const getPrivateGrievances = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const grievances = await PrivateGrivance.find({}).sort({ date: -1 });
		res.status(200).json(grievances);
		console.log("Private Grievances fetched successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const setPublicGrievance = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const id = req.params.id;

		const grievance = await PublicGrivance.findById(id);

		const { status } = req.body;

		if (!status || !["Pending", "Resolved", "Cancelled"].includes(status))
			return res.status(400).json({ message: "Invalid Status" });

		grievance.status = status;

		await grievance.save();

		res.status(200).json(grievance);
		console.log("Public Grievance status updated successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const setPrivateGrievance = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const id = req.params.id;

		const grievance = await PrivateGrivance.findById(id);

		const { status } = req.body;

		if (!status || !["Pending", "Resolved", "Cancelled"].includes(status))
			return res.status(400).json({ message: "Invalid Status" });

		grievance.status = status;

		await grievance.save();

		res.status(200).json(grievance);
		console.log("Private Grievance status updated successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const addStudent = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff) {
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });
		}

        if (Staff.post != "Director" && Staff.post != "HOD") {
			return res
				.status(403)
				.json({
					message:
						"Forbidden - You don't have permission to add students",
				});
		}

		const {
			name,
			roll_no,
			aadhar,
			gender,
			fathers_name,
			mothers_name,
			phone_no,
			email,
			address,
			year,
			college,
			course,
			branch,
            classroom,
			// password,
			// confirm_password,
		} = req.body;

		if (
			!name ||
			!roll_no ||
			!aadhar ||
			!gender ||
			!fathers_name ||
			!mothers_name ||
			!phone_no ||
			!email ||
			!address ||
			!year ||
			!college ||
			!course ||
			!branch ||
            !classroom
			// !password ||
			// !confirm_password
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		
        // Generate a 6 digit temporary password
        const tempPassword = Math.random().toString(36).slice(-6);
        
		const newroll_no = await Student.findOne({ roll_no });
		const newphone = await Student.findOne({ phone_no });
		const newemail = await Student.findOne({ email });
		const newaadhar = await Student.findOne({ aadhar });

		if (newroll_no)
			return res
				.status(400)
				.json({ message: "Roll number already exists" });

		if (newphone)
			return res
				.status(400)
				.json({ message: "Phone number already exists" });

		if (newemail)
			return res.status(400).json({ message: "Email already exists" });

		if (newaadhar)
			return res
				.status(400)
				.json({ message: "Aadhar number already exists" });


		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(tempPassword, salt);

		const newStudent = new Student({
			name,
			roll_no,
			aadhar,
			gender,
			fathers_name,
			mothers_name,
			phone_no,
			email,
			address,
			year,
			college,
			course,
			branch,
            classroom,
			temp_pass: hashedPassword,

			password: " ",
			date_of_birth: " ",
			blood_group: " ",
			fathers_no: " ",
			mothers_no: " ",
			fathers_email: " ",
			mothers_email: " ",

			privete_grivance: [],
			public_grivance: [],
			outregister: [],
			Leave: [],
			present_on: [],
			absent_on: [],
		});

		if (newStudent) {
			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.Email,
					pass: process.env.Pass,
				},
			});

			const mailOptions = {
				from: process.env.Email,
				to: email,
				subject: "Registration in O.R.B.I.T.",
				text: `Hello ${name},

You have successfully registered in the O.R.B.I.T.
Your details are as follows:

Name: ${name}
Roll Number: ${roll_no}
Aadhar Number: ${aadhar}
Phone Number: ${phone_no}
Email: ${email}
Address: ${address}
Fathers Name: ${fathers_name}
Mothers Name: ${mothers_name}
Address: ${address}
Year: ${year}
College: ${college}
Course: ${course}
Branch: ${branch}
Class: ${classroom}

You can now login to the system using your phone number as the userid and your temperary password.
                
Userid:             ${phone_no} 
Temporary Password: ${tempPassword}
                
You need to set your Password and fill rest of the required fields
                
Have a Nice Day`,
			};

			await newStudent.save();

			try {
				const emailResponse = await new Promise((resolve, reject) => {
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) reject(error);
						else resolve(info.response);
					});
				});
				console.log("Email sent:", emailResponse);
			} catch (emailError) {
				console.error("Failed to send email:", emailError.message);
				return res.status(500).json({ error: "Failed to send email." });
			}

			res.status(201).json(newStudent);

			console.log("Student registered successfully");
		}
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const removeStudent = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const Student = await Student.findByIdAndDelete(req.params.id);

		if (!Student)
			return res.status(404).json({ message: "Student not found" });

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.Email,
				pass: process.env.Pass,
			},
		});

		const mailOptions = {
			from: process.env.Email,
			to: Student.email,
			subject: "Student Removed",
			text: `Hello ${Student.name},
			
We are informing you that your hostel account has been removed from our system. 
			
If you have any further queries, please do not hesitate to contact us.

Have a Nice Day`,
		};

		try {
			const emailResponse = await new Promise((resolve, reject) => {
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) reject(error);
					else resolve(info.response);
				});
			});
			console.log("Email sent:", emailResponse);
		} catch (emailError) {
			console.error("Failed to send email:", emailError.message);
			return res.status(500).json({ error: "Failed to send email." });
		}

		res.json(Student);
		console.log("Student deleted successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const getAttendance = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const { hostel, date } = req.body;

		if (!hostel || !date)
			return res
				.status(400)
				.json({ message: "Hostel and Date are required" });

		const Students = await Student.find({ hostel }).sort({ room_no: 1 });

		if (!Students || Students.length === 0)
			return res
				.status(404)
				.json({ message: `Students not found in ${hostel} Hostel` });

		const [day, month, year] = date.split("-"); // Split by the hyphen to extract day, month, and year

		// Convert the input date to ISO format and set time to midnight to compare only the date
		const iso = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)); // Month is 0-indexed
		const getdate = iso.toISOString().split("T")[0]; // Extract YYYY-MM-DD from the ISO string

		const getDateOnly = (dateString) => {
			const date = new Date(dateString);
			date.setHours(0, 0, 0, 0); // Set the time to midnight
			return date.toISOString().split("T")[0]; // Return only the YYYY-MM-DD part
		};

		const present = Students.filter((Student) =>
			Student.present_on?.some(
				(attendanceDate) =>
					getDateOnly(attendanceDate.toISOString()) === getdate
			)
		);

		const absent = Students.filter((Student) =>
			Student.absent_on?.some(
				(attendanceDate) =>
					getDateOnly(attendanceDate.toISOString()) === getdate
			)
		);

		res.json({ present, absent });

		console.log("Attendance fetched successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const saveAttendence = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });

		const { students } = req.body;

		if (!students)
			return res.status(400).json({ message: "Students are required" });

		console.log("Students: ", students);
		// Check if an IP record already exists
		let attendanceRecord = await Attendance.findOne(); // Get the first matching IP record

		if (!attendanceRecord) {
			attendanceRecord = new Attendance({ Student: students });
		} else {
			for (const student of students) {
				if (!attendanceRecord.Student.includes(student))
					attendanceRecord.Student.push(student);
			}
		}

		await attendanceRecord.save();
		console.log("Attendance marked successfully");
		res.status(200).json(attendanceRecord);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const markAttendence = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff)
			return res
				.status(401)
				.json({ message: "Unauthorized - No Staff Provided" });

		const attendance = await Attendance.findOne();

		const presentStudents = attendance.Student;

		const Students = await Student.find().sort({ room_no: 1 });

		const date = new Date();
		const attendanceDate = date.toLocaleDateString("en-CA", {
			timeZone: "Asia/Kolkata",
		});

		console.log("Attendance Date: ", attendanceDate);

		var present = [];
		for (const Student of Students) {
			if (presentStudents.includes(Student._id)) {
				present.push(Student);
				console.log(Student.name);
				Student.present_on.push(attendanceDate);
			}
			await Student.save();
		}
		attendance.Student = [];
		await attendance.save();
		res.json(present);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};
