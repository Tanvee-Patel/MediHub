import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
// import Patients from "./components/Patients";
// import Receptionists from "./components/Receptionists";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setAdmin } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setAdmin]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  }

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<ProtectedRoute element={<AddNewDoctor />} isAuthenticated={isAuthenticated} />} />
        <Route path="/admin/addnew" element={<ProtectedRoute element={<AddNewAdmin />} isAuthenticated={isAuthenticated} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Messages />} isAuthenticated={isAuthenticated} />} />
        <Route path="/doctors" element={<ProtectedRoute element={<Doctors />} isAuthenticated={isAuthenticated} />} />
        {/* <Route path="/patients" element={<ProtectedRoute element={<Patients />} isAuthenticated={isAuthenticated} />} />
        <Route path="/receptionists" element={<ProtectedRoute element={<Receptionists />} isAuthenticated={isAuthenticated} />} /> */}
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;



// import React, { useContext, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import AddNewDoctor from "./components/AddNewDoctor";
// import Messages from "./components/Messages";
// import Doctors from "./components/Doctors";
// import Patients from "./components/Patients";
// import Receptionists from "./components/Receptionists";
// import { Context } from "./main";
// import axios from "axios";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "./components/Sidebar";
// import AddNewAdmin from "./components/AddNewAdmin";
// import "./App.css";

// const App = () => {
//   // const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
//   //   useContext(Context);

//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "http://localhost:4000/api/v1/user/admin/me",
//   //         {
//   //           withCredentials: true,
//   //         }
//   //       );
//   //       setIsAuthenticated(true);
//   //       setAdmin(response.data.user);
//   //     } catch (error) {
//   //       setIsAuthenticated(false);
//   //       setAdmin({});
//   //     }
//   //   };
//   //   fetchUser();
//   // }, [isAuthenticated]);

//   return (
//     <Router>
//       <Sidebar />
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/doctor/addnew" element={<AddNewDoctor />} />
//         <Route path="/admin/addnew" element={<AddNewAdmin />} />
//         <Route path="/messages" element={<Messages />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/patients" element={<Patients />} />
//         <Route path="/receptionists" element={<Receptionists />} />
//       </Routes>
//       <ToastContainer position="top-center" />
//     </Router>
//   );
// };

// export default App;
