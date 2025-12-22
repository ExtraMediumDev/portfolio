import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { external_link } from "../assets";
import { experiences } from "../data";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn } from "../utils/motion";

// Google Drive PDF - using embedded viewer with fit parameter
const RESUME_FILE_ID = "1d6kWGYBypGHz_E5zESCoOKKuupBqxCJw";
const RESUME_PDF_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview?usp=embed_googleplus`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view`;

// Hook to detect if viewport is wide enough for side-by-side layout
const useIsWideScreen = () => {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const checkAspectRatio = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Trigger side-by-side when width is at least 65% of height
      // AND width is at least 800px to ensure enough space
      setIsWide(width >= height * 0.65 && width >= 800);
    };

    checkAspectRatio();
    window.addEventListener("resize", checkAspectRatio);
    return () => window.removeEventListener("resize", checkAspectRatio);
  }, []);

  return isWide;
};

// Hexagonal/organic collage layout - centered shape
const ImageCollage = () => {
  const collageLayout = [
    { col: "1 / 3", row: "1 / 3", size: "large" },
    { col: "3 / 4", row: "1 / 2", size: "small" },
    { col: "3 / 4", row: "2 / 3", size: "small" },
    { col: "4 / 5", row: "1 / 3", size: "tall" },
    { col: "2 / 4", row: "3 / 4", size: "wide" },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2 justify-center">
          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
          Experience Highlights
        </h3>
        
        <div 
          className="grid gap-3 mx-auto"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, minmax(100px, 120px))",
            maxWidth: "800px"
          }}
        >
          {experiences.map((exp, index) => {
            if (index >= collageLayout.length) return null;
            
            const layout = collageLayout[index];
            const isYouTube = exp.company_name.includes("ExtraMediumDev");
            const Component = isYouTube ? motion.a : motion.div;
            const linkProps = isYouTube ? { href: exp.link, target: "_blank", rel: "noopener noreferrer" } : {};
            
            return (
              <Component
                key={`collage-${index}`}
                {...linkProps}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  relative group overflow-hidden rounded-xl
                  border border-zinc-800 hover:border-cyan-500/50
                  transition-all duration-300
                  ${isYouTube ? 'cursor-pointer' : 'cursor-default'}
                `}
                style={{
                  gridColumn: layout.col,
                  gridRow: layout.row,
                }}
              >
                <img
                  src={exp.image}
                  alt={exp.company_name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl shadow-[inset_0_0_30px_rgba(0,200,255,0.2)]" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium truncate drop-shadow-lg">
                    {exp.company_name}
                  </p>
                  <p className="text-cyan-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {exp.title}
                  </p>
                </div>
                
                {isYouTube && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-cyan-500/90 p-1.5 rounded-full">
                      <img src={external_link} alt="" className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </Component>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// PDF Resume viewer
const ResumeViewer = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
          Resume
        </h3>
        <a
          href={RESUME_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
        >
          Open full
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      {/* PDF Embed with A4 aspect ratio */}
      <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
        <div 
          className="relative w-full"
          style={{ paddingBottom: "141.4%" }}
        >
          <iframe
            src={RESUME_PDF_URL}
            title="Resume"
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};

// Contact card for sidebar
const ContactCard = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          mode: "no-cors",
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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 py-8"
      >
        <svg
          className="w-12 h-12 text-cyan-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-base font-semibold text-slate-200 text-center">
          Message sent!
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
        Get in Touch
      </h3>
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="text-slate-400 text-sm mb-1 block">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-900/50 text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-1 block">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-900/50 text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-1 block">Message</label>
          <textarea
            name="message"
            placeholder="How can I help?"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-900/50 text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 rounded-lg bg-cyan-500 text-zinc-900 font-semibold
                     disabled:opacity-60 disabled:cursor-not-allowed
                     hover:bg-cyan-400 transition-colors"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
};

// Vertical contact form for stacked layout
const VerticalContactForm = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          mode: "no-cors",
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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 py-6"
      >
        <svg
          className="w-12 h-12 text-cyan-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-base font-semibold text-slate-200">Message sent!</p>
      </motion.div>
    );
  }

  return (
    <div className="pt-8 border-t border-zinc-800">
      <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2 justify-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
        Get in Touch
      </h3>
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
          className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-900/50 text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-900/50 text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors"
        />
        <textarea
          name="message"
          placeholder="How can I help?"
          rows={3}
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-zinc-700 bg-zinc-900/50 text-white placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 rounded-lg bg-cyan-500 text-zinc-900 font-semibold
                     disabled:opacity-60 disabled:cursor-not-allowed
                     hover:bg-cyan-400 transition-colors"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
};

const Resume = () => {
  const controls = useAnimation();
  const isWideScreen = useIsWideScreen();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  return (
    <div className="sm:my-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Experience Collage - ABOVE Resume */}
        <motion.div
          variants={fadeIn("up", "spring", 0, 0.75)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <ImageCollage />
        </motion.div>

        {/* Wide Screen Layout: Contact Left, Resume Right (only when width > height) */}
        {isWideScreen ? (
          <div className="flex gap-8 items-start justify-center">
            {/* Contact Card - Left Side */}
            <motion.div
              variants={fadeIn("right", "spring", 0.1, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-72 flex-shrink-0 sticky top-24"
            >
              <ContactCard />
            </motion.div>

            {/* Resume - Right Side, fixed width to maintain aspect ratio */}
            <motion.div
              variants={fadeIn("left", "spring", 0.2, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{ width: "min(500px, calc(100vw - 400px))" }}
              className="flex-shrink-0"
            >
              <ResumeViewer />
            </motion.div>
          </div>
        ) : (
          /* Stacked Layout: Resume then Contact at bottom */
          <div className="flex flex-col gap-12">
            {/* Resume */}
            <motion.div
              variants={fadeIn("up", "spring", 0.1, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto w-full"
            >
              <ResumeViewer />
            </motion.div>

            {/* Contact at bottom */}
            <motion.div
              variants={fadeIn("up", "spring", 0.2, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <VerticalContactForm />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Resume, "resume");
