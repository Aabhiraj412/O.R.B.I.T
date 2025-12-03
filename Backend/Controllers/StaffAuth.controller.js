import Staff from "../Schemas/Staff.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { generateStaffToken } from "../Utils/GenerateToken.utils.js";

export const StaffRegisteration = async (req, res) => {
	try {
		const {
			name,
			phone,
			email,
			aadhar,
			gender,
			post,
			address,
			password,
			confirm_password,
		} = req.body;

		if (
			!name ||
			!phone ||
			!email ||
			!aadhar ||
			!gender ||
			!post ||
			!address ||
			!password ||
			!confirm_password
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		if (password.length < 6) {
			return res.status(400).json({
				message: "Password should be at least 6 characters long",
			});
		}

		if (password !== confirm_password) {
			return res.status(400).json({ message: "Password do not match" });
		}

		const newphone = await Staff.findOne({ phone });
		const newemail = await Staff.findOne({ email });
		const newaadhar = await Staff.findOne({ aadhar });

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
		const hashedPassword = await bcrypt.hash(password, salt);

		const newStaff = new Staff({
			name,
			phone,
			email,
			aadhar,
			gender,
			post,
			address,
			password: hashedPassword,
		});

		if (newStaff) {
			generateStaffToken(newStaff._id, res);

			await newStaff.save();

			res.status(201).json(newStaff);

			console.log("Staff registered successfully");
		}
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const StaffLogin = async (req, res) => {
	try {
		const { user, password } = req.body;

		if (!user || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const newuser = await Staff.findOne({
			$or: [{ phone: user }, { email: user }, { aadhar: user }],
		});

		if (!newuser) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const isMatch = await bcrypt.compare(password, newuser.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		generateStaffToken(newuser._id, res);

		res.status(200).json(newuser);
		console.log("Staff logged in successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const StaffLogout = async (req, res) => {
	try {
		res.clearCookie("jwt");
		res.status(200).json({ message: "Staff Logged Out" });
		console.log("Staff logged out successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const getStaff = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff) {
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });
		}

		res.status(200).json(Staff);
		console.log("Staff details fetched successfully");
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

		const Staff = await Staff.findOne({
			$or: [{ phone: user }, { email: user }, { aadhar: user }],
		});

		if (!Staff) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const temp_password = Math.floor(
			100000 + Math.random() * 900000
		).toString();
		const salt = await bcrypt.genSalt(10);
		const temp_pass = await bcrypt.hash(temp_password, salt);

		Staff.password = temp_pass;

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.Email,
				pass: process.env.Pass,
			},
		});

		const mailOptions = {
			from: process.env.Email,
			to: Staff.email,
			subject: "Password Reset",
			text: `Hello ${Staff.name},

It is to inform you that your temporary password is reset to ${temp_password}.

It is advised to reset your password after logging in.

Regards,
Hostel ERP Team`,
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
		await Staff.save();

		res.status(200).json({
			message: "Password reset link sent to your email",
		});
		console.log("Password reset link sent to your email");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};

export const resetPass = async (req, res) => {
	try {
		const Staff = req.Staff;

		if (!Staff) {
			return res
				.status(401)
				.json({ message: "Unauthorised-no Staff Provided" });
		}

		const { password, confirm_password } = req.body;

		if (!password || !confirm_password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		if (password.length < 6) {
			return res.status(400).json({
				message: "Password should be at least 6 characters long",
			});
		}

		if (password !== confirm_password) {
			return res.status(400).json({ message: "Password do not match" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		Staff.password = hashedPassword;

		await Staff.save();

		res.status(200).json({ message: "Password reset successfully" });
		console.log("Password reset successfully");
	} catch (error) {
		console.error(`Error: ${error.message}`);
		res.status(500).json({ message: "Server Error" });
	}
};
