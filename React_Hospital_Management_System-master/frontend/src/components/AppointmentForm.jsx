import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "Pediatrics",
    doctorId: "", // Store doctor ID instead of name
    address: "",
    hasVisited: false,
  });

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);

      // Reset formData after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        appointment_date: "",
        department: "Pediatrics",
        doctorId: "", // Reset doctor ID
        address: "",
        hasVisited: false,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Doctor not found")) {
          toast.error("Invalid doctor ID. Please select a valid doctor.");
        } else {
          toast.error(errorMessage);  // Display the error message from the server
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.doctorDepartment === formData.department
  );

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div className="form-row">
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
        <div className="form-row">
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
            placeholder="Mobile Number (e.g., 1234567890)"
            value={formData.phone}
            onChange={handleChange}
            pattern="^\+?\d{1,15}$" // Basic pattern for phone numbers
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            title="Please enter your date of birth"
          />
        </div>
        <div className="form-row">
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="appointment_date"
            placeholder="Select Appointment Date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            {departmentsArray.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            name="doctorId" // Store doctor ID instead of name
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {filteredDoctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>
        <textarea
          rows="4"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div className="form-row">
          <label>
            <input
              type="checkbox"
              name="hasVisited"
              checked={formData.hasVisited}
              onChange={handleChange}
            />
            Have you visited before?
          </label>
        </div>
        <button type="submit">Get Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;