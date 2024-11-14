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
      className={`cursor-pointer sm:mb-5 p-5 max-w-xl relative sm:text-left text-center ${
        isMobile ? "text-white" : ""
      }`}
    >
      {(isActive || isMobile) && (
        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-5 bg-tertiary my-6 sm:block hidden"></div>
      )}
      <h3
        className={`text-xl lg:text-2xl xl:text-3xl font-bold sm:pl-8 ${
          isActive || isMobile ? "text-white" : "text-slate-600"
        }`}
      >
        {experience.title}
      </h3>
      <p
        className={`text-md lg:text-lg xl:text-2xl sm:font-medium pt-2 sm:pl-8 ${
          isActive || isMobile ? "text-white" : "text-slate-600"
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
      <ul className="border-white max-w-7xl list-none space-y-8 border-2 lg:border-2 rounded-xl lg:rounded-3xl p-6">
        {experience.details.map((detail, index) => (
          <li
            key={`experience-detail-${index}`}
            className="text-slate-500 font-semibold text-[5px] xs:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[14px] lg:leading-[15px]"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
        ))}
      </ul>

      <div className="relative mt-5 flex justify-center items-center">
        <div className="relative w-3/4 max-w-xs">
            <img
            src={experience.image}
            alt={`${experience.title} image`}
            className="w-full object-cover rounded-lg transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-lg"
            />
            <a
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 bg-gray-300 bg-opacity-80 p-2 rounded-full transition-transform duration-300 ease-out transform hover:scale-110 hover:bg-gray-600"
            >
            <img src= {external_link} alt="Open Link" className="w-4 h-4" />
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sm:my-20">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionText} text-center`}>
          Experience
        </h2>
      </motion.div>

      <div className="relative mt-10 md:mt-20 md:p-20 flex flex-col items-center sm:flex-row sm:items-start bg-black rounded-lg bg-opacity-90" style={{ maxWidth: 'calc(90% - 10px)', margin: '0 auto' }}>
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

export default SectionWrapper(Experience, "portfolio");