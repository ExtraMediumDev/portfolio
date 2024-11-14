import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { external_link } from "../assets";
import { portfolio } from "../data";
import SectionWrapper from "../hoc/SectionWrapper";

import { fadeIn } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  image,
  link
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn("up", "spring", 0, 0.75)}
      className={`w-full md:w-[90%] lg:w-[90%] mt-[-2px] flex flex-col md:flex-row gap-5 p-6 bg-black bg-opacity-90 rounded-3xl ${
        isEven ? 'self-start' : 'self-end'
      }`}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-3/5 flex justify-center items-center group">
        <img
          src={image}
          alt="project_image"
          className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-out transform group-hover:scale-105 group-hover:shadow-lg"
        />

        <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 bg-gray-300 bg-opacity-80 p-2 rounded-full transition-transform duration-300 ease-out transform hover:scale-110 hover:bg-gray-600"
        >
        <img src= {external_link} alt="Open Link" className="w-4 h-4" />
        </a>
      </div>

      {/* Text Section */}
      <div className={`w-full md:w-2/5 flex flex-col justify-center px-6 md:p-10 ${isEven ? 'text-left' : 'text-right'}`}>
        <h3 className="text-white font-medium text-lg md:text-xl lg:text-2xl leading-tight">
          {name}
        </h3>
        <p className="text-white mt-4 text-secondary text-xs md:text-xs lg:text-xs">
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
export default SectionWrapper(Portfolio, "Portfolio");
