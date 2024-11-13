import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      {/* Banner Section */}
      <div className="banner">
        <h1>{title}</h1>
        <p>
          MediHub is a web-based medical management platform designed to enhance healthcare efficiency through a streamlined, user-friendly interface. 
          The website enables healthcare providers to manage patient records and appointments in one secure place. 
          Accessible from any device, MediHub ensures seamless coordination between patients and staff, improving care delivery and administrative processes.
        </p>
      </div>

      {/* Image Section */}
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;