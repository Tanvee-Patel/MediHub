import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        // Safely access error message
        const errorMessage =
          error.response?.data?.message || "Failed to fetch doctors";
        toast.error(errorMessage);
      }
    };
    
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div className="card" key={doctor._id}>
              <img
                src={doctor.docAvatar?.url}
                alt="doctor avatar"
                className="doctor-avatar"
              />
              <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
              <div className="details">
                <p>
                  Email: <span>{doctor.email}</span>
                </p>
                <p>
                  Phone: <span>{doctor.phone}</span>
                </p>
                <p>
                  DOB: <span>{doctor.dob.substring(0, 10)}</span>
                </p>
                <p>
                  Department: <span>{doctor.doctorDepartment}</span>
                </p>
                <p>
                  NIC: <span>{doctor.nic}</span>
                </p>
                <p>
                  Gender: <span>{doctor.gender}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;