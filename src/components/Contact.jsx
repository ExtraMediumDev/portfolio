import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwL1-CjctKKKLYZmzu9wMZID_HQqJVhR6imzO5pKpV6JzhQ90jqtjhpIpE2DmQeJqWjGg/exec",
        {
          method: "POST",
          mode: "no-cors", // fire-and-forget
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(form).toString(),
        }
      );

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: {
            opacity: 1,
            y: 0,
            transition: { type: "tween", duration: 0.6, delay: 0.1 },
          },
        }}
        className="w-full max-w-xl mx-auto"
      >
        <h3 className={`${styles.sectionText} text-slate-900 text-center`}>
          Contact
        </h3>

        {submitted ? (
          // ✅ Submitted animation / success message
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-semibold text-slate-700">
              Thank you! Your message has been sent.
            </p>
          </motion.div>
        ) : (
          // ✍️ Contact form
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-8 bg-white/85 backdrop-blur rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col gap-4"
          >
            <label className="text-slate-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="p-3 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400"
            />

            <label className="text-slate-700 font-medium mt-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="p-3 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400"
            />

            <label className="text-slate-700 font-medium mt-1">Message</label>
            <textarea
              name="message"
              placeholder="How can I help?"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-slate-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center rounded-lg px-5 py-3
                         bg-slate-900 text-white font-semibold
                         disabled:opacity-60 disabled:cursor-not-allowed
                         hover:bg-slate-800 transition-colors"
            >
              {loading ? "Sending…" : "Send"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;
