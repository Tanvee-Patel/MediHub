import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  // State variables for registration
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // for loading spinner example

  const navigateTo = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    // Validate the required fields
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true); // Start the loading spinner

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/patient/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      // Set user details in context
      setUser(response.data.user); // Assuming the response has user data
      setIsAuthenticated(true);
      toast.success(response.data.message);
      navigateTo("/");

      // Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: ""
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsSubmitting(false); // Stop loading spinner
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please Sign Up To Continue</p>
      <form onSubmit={handleRegistration}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="nic"
            placeholder="NIC (Add Aadhar Card Number)"
            value={formData.nic}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ marginBottom: 0 }}>Already Registered?</p>
          <Link to="/login" style={{ textDecoration: "none", color: "#271776ca" }}>
            Login Now
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
