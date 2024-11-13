import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | MediHub"}
        imageUrl={
          "https://miro.medium.com/max/4242/1*mDuyVXtEm-qJL0baCjI4CQ.jpeg"
        }
      />
      <Biography />
    </>
  );
};

export default AboutUs;