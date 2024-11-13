import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
    <br></br>
      {/* <Hero
        title={"Schedule Your Appointment | MediHub"}
        imageUrl={"https://img.freepik.com/premium-photo/appointment-with-doctor-concept-close-up-photo-paper-blank-calendar-with-medical-tool-stethoscope-practitioner-s-tabletop_352249-3320.jpg"}
      /> */}
      <AppointmentForm />
    </>
  );
};

export default Appointment;