import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          In today’s healthcare environment, hospitals face increasing pressure to improve patient care while maintaining cost efficiency.
An effective HMS is crucial for handling the complexities of hospital operations, ensuring that patient data is accurately recorded, accessible, and secure.

          </p>
        
          <p>
          Improving Patient Care
          <br></br>
          Data Accuracy
          <br></br>
          Manual Processes
          <br></br>
          Resource  Management

          </p>
         
        </div>
      </div>
    </>
  );
};

export default Biography;
