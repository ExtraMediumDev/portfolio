import { motion } from "framer-motion";
import React from "react";
import { external_link } from "../assets";
import { portfolio } from "../data";
import SectionWrapper from "../hoc/SectionWrapper";
import { fadeIn } from "../utils/motion";

const ProjectCard = ({ index, name, description, image, link }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="
        w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]
        flex flex-col
        bg-zinc-900/90 backdrop-blur-sm rounded-2xl
        border border-zinc-700 shadow-sm transition-all duration-300
        hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30
        overflow-hidden group
      "
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            absolute top-3 right-3 rounded-full
            bg-zinc-900/80 backdrop-blur border border-zinc-600
            p-2 transition-all duration-300 ease-out
            opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
            hover:scale-110 hover:bg-cyan-500 hover:border-cyan-400
          "
          aria-label="Open project"
        >
          <img src={external_link} alt="" className="w-4 h-4 invert" />
        </a>
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-white font-semibold text-lg leading-tight">
          {name}
        </h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* View Project Link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors inline-flex items-center gap-1 group/link"
        >
          View Project
          <svg
            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
          Projects
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          A collection of things I've built and explored
        </p>
      </motion.div>

      {/* Centered Flex Layout */}
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {portfolio.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

// use lowercase id for consistency with navbar anchors
export default SectionWrapper(Portfolio, "portfolio");
