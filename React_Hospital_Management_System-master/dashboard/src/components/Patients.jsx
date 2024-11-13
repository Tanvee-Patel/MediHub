import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/Patients.css";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/patients");
      setPatients(response.data.patients);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error fetching patients"; // Improved error handling
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Patients</h1>
      {loading ? ( // Display loading state
        <p>Loading patients...</p>
      ) : patients.length > 0 ? ( // Check if patients are available
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}> {/* Use unique identifier */}
              {patient.firstName} {patient.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No patients found.</p> // Handle no patients found
      )}
      <Link to="/add-patient">
        <div className="button-container">
          <button className="add-button">Add Patient</button>
        </div>
      </Link>
    </div>
  );
};

export default Patients;