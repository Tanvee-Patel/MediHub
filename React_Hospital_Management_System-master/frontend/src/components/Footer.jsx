import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "../styles/Footer.css";
import logo from "../assets/mainlogo.png";

// Footer Component
const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" }, // Corrected day from "Monday" to "Friday"
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  const contacts = [
    { email: "aakankshyadas.it21@sect.ac.in" },
    { email: "dharabhakhar.it21@sect.ac.in" },
    { email: "tanveepatel.it21@sect.ac.in" },
    { email: "jahanviparmaar.it21@sect.ac.in" },
  ];

  return (
    <footer className="container">
      <hr />
      <div className="content">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="ZeeCare Medical Institute" className="logo-img" />
          </Link>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* Hours of Operation Section */}
        <div className="hours">
          <h4>Hours</h4>
          <ul>
            {hours.map(({ id, day, time }) => (
              <li key={id}>
                <span>{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h4>Contact</h4>
          <div>
            <FaPhone /> <span>+91 7778857425</span>
          </div>
          {contacts.map((contact, index) => (
            <div key={index}>
              <MdEmail /> <span>{contact.email}</span>
            </div>
          ))}
          <div>
            <FaLocationArrow /> <span>Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;