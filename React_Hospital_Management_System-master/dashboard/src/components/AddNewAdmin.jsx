import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();

    // Simple validation check
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
      toast.error("All fields are required!");
      return;
    }

    const adminData = { firstName, lastName, email, phone, nic, dob, gender, password };

    try {
      const res = await axios.post("http://localhost:4000/api/v1/user/admin/addnew", adminData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      
      // Clear fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      const message = error.response ? error.response.data.message : "An error occurred.";
      toast.error(message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleAddNewAdmin}>
          <div className="form-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-row">
            <input
              type="email" // Change to email type for validation
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="tel" // Change to tel type for better mobile input
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-row">
            <input
              type="text" // Change to text type for NIC
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="input-field"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-row">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-field"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Female">Other</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-row">
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;