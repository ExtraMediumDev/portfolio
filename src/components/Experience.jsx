import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { external_link } from "../assets";
import { experiences } from "../data";
import SectionWrapper from "../hoc/SectionWrapper";
import styles from "../styles";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, onClick, isActive, isMobile }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer sm:mb-5 p-5 max-w-xl relative sm:text-left text-center
        transition-colors
        ${isActive || isMobile ? "bg-zinc-800 rounded-xl" : ""}
      `}
    >
      {isActive && !isMobile && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r" />
      )}
      <h3
        className={`text-xl lg:text-2xl xl:text-3xl font-bold sm:pl-6 ${
          isActive || isMobile ? "text-white" : "text-slate-400"
        }`}
      >
        {experience.title}
      </h3>
      <p
        className={`text-md lg:text-lg xl:text-xl sm:pl-6 ${
          isActive || isMobile ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {experience.company_name} | {experience.date}
      </p>
    </div>
  );
};

const ExperienceDetails = ({ experience }) => {
  return (
    <div className="mt-5">
      <ul className="max-w-3xl list-none space-y-4 border border-zinc-700 rounded-xl p-6 bg-zinc-800/90 backdrop-blur">
        {experience.details.map((detail, index) => (
          <li
            key={`experience-detail-${index}`}
            className="text-slate-300 font-medium text-xs md:text-sm leading-snug"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
        ))}
      </ul>

      <div className="relative mt-6 flex justify-center items-center">
        <div className="relative w-3/4 max-w-xs">
          <img
            src={experience.image}
            alt={`${experience.title} image`}
            className="w-full object-cover rounded-lg transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-white/10"
          />
          <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 bg-zinc-800/90 border border-zinc-600 p-2 rounded-full transition-transform duration-300 ease-out transform hover:scale-110 hover:bg-zinc-700"
          >
            <img src={external_link} alt="Open Link" className="w-4 h-4 invert" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [selectedJob, setSelectedJob] = useState(experiences[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sm:my-20">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionText} text-center text-white`}>
          
        </h2>
      </motion.div>

      <div
          className="relative mt-10 md:mt-20 md:p-12 flex flex-col sm:flex-row sm:items-start
                    sm:gap-8 lg:gap-12
                    bg-zinc-900/90 backdrop-blur rounded-lg border border-zinc-700"
          style={{ maxWidth: "calc(90% - 10px)", margin: "0 auto" }}
      >
        <div className="flex flex-col z-10 sm:w-auto sm:w-full">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              onClick={() => setSelectedJob(experience)}
              isActive={selectedJob === experience}
              isMobile={isMobile}
            />
          ))}
        </div>

        <div className="flex justify-end z-10 sm:block hidden">
          <ExperienceDetails experience={selectedJob} />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
