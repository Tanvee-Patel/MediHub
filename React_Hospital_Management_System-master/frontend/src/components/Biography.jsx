import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="Who we are" />
      </div>
      <div className="content">
        <h2>Biography</h2>
        <br></br>
        <h3>Who We Are</h3>
        <p>
          In today’s healthcare environment, hospitals face increasing pressure to improve patient care while maintaining cost efficiency.
          An effective Hospital Management System (HMS) is crucial for handling the complexities of hospital operations, ensuring that patient data is accurately recorded, accessible, and secure.
        </p>
        <br></br>
        <h4>Key Focus Areas:</h4>
        <ul>
          <li>Improving Patient Care</li>
          <li>Data Accuracy</li>
          <li>Eliminating Manual Processes</li>
          <li>Effective Resource Management</li>
        </ul>
        <br></br>
        <h4>Contact Us</h4>
        <p>Telephone no: +0261 2361257</p>
        <p>Email: medi@hub.org</p>

      </div>
    </div>
  );
};

export default Biography;