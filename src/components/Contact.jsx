import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles";

const Contact = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzGbOwEk3rR9O_hwnuGgTrfnXvxfWPUOEB9bl4RRvHsHmWZAn8ioI5axYrIQH7Tn3dEWg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(form).toString(),
      });

      if (response.ok) {
        navigate("/Submitted");;
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              type: "tween",
              duration: 1,
              delay: 0.2,
            },
          },
        }}
        className="w-full max-w-lg p-10 mx-4 rounded-lg"
      >
        <h3 className={`${styles.sectionText} text-white text-center`}>Contact</h3>

        <form onSubmit={handleSubmit} className="mt-12 gap-4 flex flex-col">
        
          <label className="text-white font-medium mt-3">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}  // Add value attribute
            onChange={handleChange}  // Ensure handleChange is set up to update state
            className="text-gray-900 bg-tertiary p-4 border border-gray-500 rounded-lg font-medium"
          />
          <label className="text-white font-medium mt-3">Email Address</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            value={form.email}  // Add value attribute
            onChange={handleChange}  // Ensure handleChange is set up to update state
            className="bg-tertiary p-4 text-gray-900 border border-gray-500 rounded-lg font-medium"
          />
          <label className="text-white font-medium mt-3">Message</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="5"
            value={form.message}  // Add value attribute
            onChange={handleChange}  // Ensure handleChange is set up to update state
            className="bg-tertiary p-4 text-gray-900 border border-gray-500 rounded-lg font-medium"
          />
          <button
            type="submit"
            className="bg-primary py-3 px-8 mt-4 text-white bg-gray-500 font-bold rounded-lg shadow-md"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
