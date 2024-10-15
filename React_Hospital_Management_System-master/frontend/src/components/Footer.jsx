import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "../styles/Footer.css";
import logo from "../assets/mainlogo.png";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  


  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
        <div className="logo">
      <Link to="/">
        <img src={logo} alt="ZeeCare Medical Institute" className="logo-img" />
      </Link>
    </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div className="hours">
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>+91 7778857425</span>
            </div>
            <div>
              <MdEmail />
              <span>aakankshyadas.it21@sect.ac.in</span>
            </div>
            <div>
              <MdEmail />
              <span>dharabhakhar.it21@sect.ac.in</span>
            </div>
            <div>
              <MdEmail />
              <span>tanveepatel.it21@sect.ac.in</span>
            </div>
            <div>
              <MdEmail />
              <span>jahanviparmaar.it21@sect.ac.in</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Gujarat, India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;