import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { close, menu, githubIcon, linkedinIcon, instagramIcon } from "../assets";
import { navLinks } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <nav
      className="w-full flex items-center bg-gradient-to-b from-black sm:bg-none p-8 sm:px-16 sm:py-10 fixed z-40 pointer-events-none"
    >
      <div className='w-full flex mx-auto justify-between'>
        <Link
          to='/'
          className='flex items-start text-slate-500 hover:text-white transition-colors'
          onClick={() => {
            setActive("Home");
            window.scrollTo(0, 0);
          }}
        >
          <p className='text-[26px] lg:text-[36px] font-bold pointer-events-auto cursor-pointer flex' style={{ transform: 'translateY(-26px)' }} >
            BL
          </p>
        </Link>

        <div className="flex gap-5 ml-8 pointer-events-auto" style={{ transform: 'translateY(-10px)' }} >
          <a
            href="https://github.com/extramediumdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <img src={githubIcon} alt="GitHub" className="w-6 h-6 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-50 hover:opacity-100" style={{ filter: 'invert(1)' }} />
          </a>
          <a
            href="https://www.linkedin.com/in/brian-li-0748a426a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-50 hover:opacity-100" style={{ filter: 'invert(1)' }} />
          </a>
          <a
            href="https://instagram.com/librianli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <img src={instagramIcon} alt="Instagram" className="w-6 h-6 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-50 hover:opacity-100" style={{ filter: 'invert(1)' }} />
          </a>
        </div>

        <ul className='list-none hidden sm:flex flex-col gap-5 ml-auto'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`relative flex items-center ${
                active === nav.id ? "text-white" : "text-slate-500"
              } hover:text-white text-[18px] lg:text-[24px] font-bold pointer-events-auto cursor-pointer`}
              onClick={() => setActive(nav.id)}
            >
              {active === nav.id && (
                <div className="fixed right-10 w-2 h-6 lg:h-8 bg-quaternary"></div>
              )}
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain pointer-events-auto cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-30 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-white"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.id);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;