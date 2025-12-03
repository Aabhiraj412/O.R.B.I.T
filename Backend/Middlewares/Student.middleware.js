import jwt from "jsonwebtoken";
import Student from "../Schemas/Student.model.js";

const StudentProtectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res
				.status(401)
				.json({ error: "Unauthorised-no Token Provided" });
		}

		const decode = jwt.verify(token, process.env.JWT_Student);

		if (!decode) {
			return res.status(401).json({ message: "Invalid Token" });
		}
		const student = await Student.findById(decode.user);

		if (!student) {
			return res.status(401).json({ message: "No Student Found" });
		}

		req.Student = student;

		next();
	} catch (e) {
		res.status(500).json({
			message: "Some error Occur in Student Protect Route",
		});
		console.log("Some erroe Occur in Protect Route", e.message);
	}
};

export default StudentProtectRoute;
