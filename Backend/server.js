import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./Database/Connect.js";

import AuthRouter from "./Routes/Auth.routes.js";
import StaffRouter from "./Routes/Staff.routes.js";
import StudentRouter from "./Routes/Student.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

// app.use(cors({origin:"*", credentials:true}));
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Reflect origin dynamically
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/api/auth", AuthRouter);
app.use("/api/staff", StaffRouter);
app.use("/api/student", StudentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
