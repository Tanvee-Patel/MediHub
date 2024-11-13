import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/Receptionists.css";

const Receptionists = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchReceptionists();
  }, []);

  const fetchReceptionists = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/receptionists");
      setReceptionists(response.data.receptionists);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error fetching receptionists"; // Improved error handling
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Receptionists</h1>
      {loading ? ( // Display loading state
        <p>Loading receptionists...</p>
      ) : receptionists.length > 0 ? ( // Check if receptionists are available
        <ul>
          {receptionists.map((receptionist) => (
            <li key={receptionist._id}> {/* Use unique identifier */}
              {receptionist.firstName} {receptionist.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No receptionists found.</p> // Handle no receptionists found
      )}
      <Link to="/add-receptionist">
        <div className="button-container">
          <button className="add-button">Add Receptionist</button>
        </div>
      </Link>
    </div>
  );
};

export default Receptionists;