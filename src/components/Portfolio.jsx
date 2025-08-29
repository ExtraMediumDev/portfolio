import { motion } from "framer-motion";
import React from "react";
import { external_link } from "../assets";
import { portfolio } from "../data";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn } from "../utils/motion";

const ProjectCard = ({ index, name, description, image, link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", 0, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="
        w-full md:w-[90%] lg:w-[90%] self-end
        flex flex-col md:flex-row gap-5 p-6
        bg-slate-300/85 backdrop-blur-sm rounded-2xl
        border border-slate-200 shadow-sm transition-shadow
        hover:shadow-md
      "k
    >
      {/* Image */}
      <div className="relative w-full md:w-3/5 flex justify-center items-center group">
        <img
          src={image}
          alt="project"
          className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-out transform group-hover:scale-[1.02]"
        />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute top-2 right-2 rounded-full
            bg-white/80 backdrop-blur border border-slate-200
            p-2 transition-transform duration-300 ease-out
            hover:scale-110 hover:bg-white
          "
          aria-label="Open project"
        >
          <img src={external_link} alt="" className="w-4 h-4" />
        </a>
      </div>

      {/* Text */}
      <div className="w-full md:w-2/5 flex flex-col justify-center px-6 md:p-10 text-right">
        <h3 className="text-slate-900 font-semibold text-lg md:text-xl lg:text-2xl leading-tight">
          {name}
        </h3>
        <p className="mt-3 text-sm md:text-sm lg:text-base text-slate-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <div className="flex justify-center text-center md:text-left px-4 md:px-12 lg:px-20">
      <div className="mt-10 md:mt-20 flex flex-col gap-10 md:gap-20 w-full max-w-full">
        {portfolio.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

// use lowercase id for consistency with navbar anchors
export default SectionWrapper(Portfolio, "portfolio");
