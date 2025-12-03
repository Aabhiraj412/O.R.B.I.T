import jwt from "jsonwebtoken";
import Staff from "../Schemas/Staff.model.js";

const StaffProtectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res
				.status(401)
				.json({ error: "Unauthorised-no Token Provided" });
		}

		const decode = jwt.verify(token, process.env.JWT_Staff);

		if (!decode) {
			return res.status(401).json({ message: "Invalid Token" });
		}
		const staff = await Staff.findById(decode.user);

		if (!staff) {
			return res.status(401).json({ message: "No Staff Found" });
		}

		req.Staff = staff;

		next();
	} catch (e) {
		res.status(500).json({
			message: "Some error Occur in Warder Protect Route",
		});
		console.log("Some erroe Occur in Protect Route", e.message);
	}
};

export default StaffProtectRoute;
