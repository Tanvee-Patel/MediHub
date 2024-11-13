import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={"MediHub | Leading the Way in Patient Care"}
        imageUrl={"https://th.bing.com/th/id/R.099835ceeb7150d707db2cb4884caa15?rik=Emzh1DFL2dyA5w&riu=http%3a%2f%2fwww.absolutecorporatesolutions.com%2fimages%2fhospital-management-system-in-kenya.jpg&ehk=W0eoApf3XIv5O0riAQR0CHn8Iy8qDdMZ%2f6HxalQza9o%3d&risl=&pid=ImgRaw&r=0"}
      />
      {/* <Biography imageUrl={"https://www.practicallogix.com/wp-content/uploads/2022/10/healthcare-hero.jpg"} /> */}
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;