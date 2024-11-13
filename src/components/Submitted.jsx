import React from 'react';
import checkmark from '../assets/checkmark.png'; // Import the checkmark image
import './Submitted.css'; // Import CSS for styling

const Submitted = () => {
  return (
    <div className="submitted-container">
      <div className="checkmark-circle">
        <img src={checkmark} alt="Checkmark" className="checkmark-image" />
      </div>
      <h1 className="thank-you-text">Thank You!</h1>
      <p className="message-text">Your message has been sent successfully. We will get back to you soon.</p>
    </div>
  );
};

export default Submitted;
