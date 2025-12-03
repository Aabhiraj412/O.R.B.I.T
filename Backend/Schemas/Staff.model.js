import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		aadhar: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["male", "female", "other"],
			required: true,
		},
		post: {
			type: String,
			enum: ["Director", "HOD", "Teaching Faculty", "Support Staff"],
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Staff = mongoose.model("Staff", StaffSchema);

export default Staff;
