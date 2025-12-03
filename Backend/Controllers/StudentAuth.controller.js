import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

import Student from "../Schemas/Student.model.js";
import { generateStudentToken } from "../Utils/GenerateToken.utils.js";

export const Studentlogin = async (req, res) => {
	try {
		const { user, password } = req.body;

		if (!user || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const newuser = await Student.findOne({
			$or: [
				{ roll_no: user },
				{ phone_no: user },
				{ email: user },
				{ aadhar: user },
			],
		});

		if (!newuser) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const isMatch = await bcrypt.compare(password, newuser.password);

		const tempMatch = await bcrypt.compare(password, newuser.temp_pass);

		if (!isMatch && !tempMatch) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		if (tempMatch && newuser.password != " ") {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		generateStudentToken(newuser._id, res);

		res.status(200).json(newuser);

		console.log("Student logged in successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const Studentlogout = (req, res) => {
	res.clearCookie("jwt", { path: "/" });
	res.status(200).json({ message: "Logged out successfully" });
};

export const addDetails = async (req, res) => {
	try {
		const Student = req.Student;

		if (!Student) {
			return res
				.status(401)
				.json({ message: "Unauthorised-no Student Provided" });
		}

		const {
			date_of_birth,
			blood_group,
			fathers_no,
			mothers_no,
			fathers_email,
			mothers_email,
		} = req.body;

		if (
			!date_of_birth ||
			!blood_group ||
            !fathers_no ||
			!mothers_no ||
			!fathers_email ||
			!mothers_email
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		Student.date_of_birth = date_of_birth;
		Student.blood_group = blood_group;
		Student.fathers_no = fathers_no;
		Student.mothers_no = mothers_no;
		Student.fathers_email = fathers_email;
		Student.mothers_email = mothers_email;

		await Student.save();
		res.status(200).json(Student);

		console.log("Details added successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const getStudent = async (req, res) => {
	try {
		const Student = req.Student;
		res.status(200).json(Student);
		console.log("Student details fetched successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const forgetPass = async (req, res) => {
	try {
		const { user } = req.body;

		if (!user) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const Student = await Student.findOne({
			$or: [
				{ roll_no: user },
				{ phone_no: user },
				{ email: user },
				{ aadhar: user },
			],
		});

		if (!Student) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const temp_pass = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		const salt = await bcrypt.genSalt(10);
		const temp_password = await bcrypt.hash(temp_pass, salt);
		Student.temp_pass = temp_password;
		Student.password = " ";

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
			subject: "Password Reset",
			text: `Hello ${Student.name},

It is to notify you that on your request a Temperary Password is Generated for you which is : ${temp_pass}.

It is advised to change your password after logging in.

Thank You
Hostel ERP`,
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
		res.status(200).json({
			message: "Temporary password sent to your email",
		});

		console.log("Temporary password sent successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};
