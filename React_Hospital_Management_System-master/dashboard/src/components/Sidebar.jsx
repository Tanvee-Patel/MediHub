import React, { useContext, useState, useRef, useEffect } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo3.png";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const sidebarRef = useRef(null);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setLoading(true); // Set loading to true on logout
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const navigateToPage = (path) => {
    navigateTo(path);
    setShow(false);
  };

  return (
    <>
      <nav ref={sidebarRef} className={show ? "show sidebar" : "sidebar"}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="links">
          <div onClick={() => navigateToPage("/")}>
            <TiHome aria-label="Home" />
            <span>Home</span>
          </div>
          <div onClick={() => navigateToPage("/doctors")}>
            <FaUserDoctor aria-label="Doctors" />
            <span>Doctors</span>
          </div>
          <div onClick={() => navigateToPage("/admin/addnew")}>
            <MdAddModerator aria-label="Add New Admin" />
            <span>Add New Admin</span>
          </div>
          <div onClick={() => navigateToPage("/doctor/addnew")}>
            <IoPersonAddSharp aria-label="Add New Doctor" />
            <span>Add New Doctor</span>
          </div>
          <div onClick={() => navigateToPage("/patients")}>
            <BsPeopleFill aria-label="Patients" />
            <span>Patients</span>
          </div>
          <div onClick={() => navigateToPage("/receptionists")}>
            <HiUserGroup aria-label="Receptionists" />
            <span>Receptionists</span>
          </div>
          <div onClick={() => navigateToPage("/messages")}>
            <AiFillMessage aria-label="Messages" />
            <span>Messages</span>
          </div>
          <div onClick={handleLogout} disabled={loading}>
            <RiLogoutBoxFill aria-label="Logout" />
            <span>{loading ? "Logging out..." : "Logout"}</span>
          </div>
        </div>
      </nav>
      <div className="wrapper" style={!isAuthenticated ? { display: "none" } : { display: "flex" }}>
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow(!show)}
          aria-label={show ? "Close menu" : "Open menu"}
        />
      </div>
    </>
  );
};

export default Sidebar;
