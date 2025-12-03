import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

const StudentProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const [studentData, setStudentData] = useState();
  const [editData, setEditData] = useState(studentData);
  const [successMessage, setSuccessMessage] = useState("");

  //retrive data from navigation state in studentData

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/Student/getdetails",
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setStudentData(data);
          setEditData(data);
        }
      } catch (err) {
        console.error("Failed to fetch Student data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    setStudentData(editData);
    setIsEditMode(false);
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setEditData(studentData);
    setIsEditMode(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  if(loading || !studentData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <p className={isDarkMode ? "text-white" : "text-gray-900"}>Loading profile...</p>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Navigation Bar */}
      <nav
        className={isDarkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-md"}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? "text-cyan-400" : "text-blue-600"
              }`}
            >
              O.R.B.I.T
            </h1>
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Student Portal
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/student/dashboard"
              className={`px-4 py-2 font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-cyan-400"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isDarkMode
                  ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                  : "bg-gray-700 text-white hover:bg-gray-800"
              }`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-lg transition ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              My Profile
            </h2>
            <p
              className={
                isDarkMode ? "text-gray-400 mt-1" : "text-gray-600 mt-1"
              }
            >
              Manage your personal and academic information
            </p>
          </div>
          <button
            onClick={() => (isEditMode ? handleCancel() : setIsEditMode(true))}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isEditMode
                ? isDarkMode
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                : isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isEditMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div
            className={`mb-6 p-4 border rounded-lg ${
              isDarkMode
                ? "bg-green-900/30 border-green-700 text-green-400"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            <p className="font-medium">{successMessage}</p>
          </div>
        )}

        {/* Profile Card */}
        <div
          className={`rounded-lg shadow-lg p-8 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Profile Header with Avatar */}
          <div
            className={`flex items-center mb-8 pb-8 border-b ${
              isDarkMode ? "border-gray-700" : ""
            }`}
          >
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold mr-6 ${
                isDarkMode ? "bg-blue-600" : "bg-blue-600"
              }`}
            >
              {studentData.name[0]}
              {studentData.name.split(' ')[1]?.[0] || studentData.name[studentData.name.length - 1]}
            </div>
            <div>
              <h3
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {studentData.name}
              </h3>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                {studentData.roll_no}
              </p>
              <p
                className={
                  isDarkMode
                    ? "text-blue-400 font-medium"
                    : "text-blue-600 font-medium"
                }
              >
                {studentData.branch}
              </p>
            </div>
          </div>

          {/* Academic Information */}
          <div
            className={`rounded-lg p-6 mb-8 ${
              isDarkMode
                ? "bg-blue-900/30 border border-blue-700/50"
                : "bg-blue-50"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Academic Information
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Year
                </p>
                <p
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {studentData.year}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Course
                </p>
                <p
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {studentData.course}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  College
                </p>
                <p
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {studentData.college}
                </p>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Classroom
                </p>
                <p
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {studentData.classroom}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                  ) : (
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {studentData.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  {isEditMode ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                  ) : (
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {studentData.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Aadhar Number
                  </label>
                  <p
                    className={`rounded-lg px-4 py-2 ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-50 text-gray-900"
                    }`}
                  >
                    {studentData.aadhar}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Gender
                  </label>
                  {isEditMode ? (
                    <select
                      name="gender"
                      value={editData.gender}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {studentData.gender?.charAt(0).toUpperCase() + studentData.gender?.slice(1)}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Phone Number
                  </label>
                  {isEditMode ? (
                    <input
                      type="tel"
                      name="phone_no"
                      value={editData.phone_no}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                  ) : (
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {studentData.phone_no}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Address
                  </label>
                  {isEditMode ? (
                    <input
                      type="text"
                      name="address"
                      value={editData.address}
                      onChange={handleEditChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                    />
                  ) : (
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {studentData.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div
            className={`pt-8 border-t ${isDarkMode ? "border-gray-700" : ""}`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Academic Details
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Roll Number
                </label>
                <p
                  className={`rounded-lg px-4 py-2 ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  {studentData.roll_no}
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Branch
                </label>
                <p
                  className={`rounded-lg px-4 py-2 ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  {studentData.branch}
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Father's Name
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="fathers_name"
                    value={editData.fathers_name}
                    onChange={handleEditChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                ) : (
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-900"}>
                    {studentData.fathers_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Mother's Name
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="mothers_name"
                    value={editData.mothers_name}
                    onChange={handleEditChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                ) : (
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-900"}>
                    {studentData.mothers_name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditMode && (
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleSaveChanges}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  isDarkMode
                    ? "bg-gray-600 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* Quick Actions */}
          <div
            className={`rounded-lg shadow-lg p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                className={`block w-full text-center py-2 rounded-lg transition text-sm ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                My Courses
              </button>
              <button
                className={`block w-full text-center py-2 rounded-lg transition text-sm ${
                  isDarkMode
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                View Grades
              </button>
              <button
                className={`block w-full text-center py-2 rounded-lg transition text-sm ${
                  isDarkMode
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Attendance */}
          <div
            className={`rounded-lg shadow-lg p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Attendance
            </h3>
            <div className="text-center">
              <p
                className={`text-4xl font-bold ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                87.5%
              </p>
              <p
                className={`text-sm mt-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Current Semester
              </p>
              <button
                className={`font-medium text-sm mt-3 block ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                View Details →
              </button>
            </div>
          </div>

          {/* Account Status */}
          <div
            className={`rounded-lg shadow-lg p-6 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Account Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Status:
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-xs">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Verification:
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-xs">
                  Verified
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Fees:
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-xs">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
