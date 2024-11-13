import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient", // Default role
  });

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    console.log("User Details:", userDetails); // Log for debugging
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, role } = userDetails;

    // Validate form inputs
    if (!email || !password || !confirmPassword || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
          confirmPassword,
          role,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Handle success response
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");

      // Clear the input fields
      setUserDetails({
        email: "",
        password: "",
        confirmPassword: "",
        role: "Patient",
      });
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message); // Log for debugging
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userDetails.confirmPassword}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={userDetails.role}
          onChange={handleChange}
          required
        >
          <option value="Patient">Patient</option>
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
        </select>
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link to="/register" style={{ textDecoration: "none", color: "#271776ca" }}>
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;