import { githubIcon, linkedinIcon, instagramIcon, headshot } from "../assets";

const Home = () => {
  return (
    <section className="h-full w-full flex flex-col justify-end items-start px-8 sm:px-12 pb-10 sm:pb-14">
      {/* Name and intro */}
      <div className="max-w-xl">
        {/* Headshot with circle crop */}
        <div className="mb-3">
          <img
            src={headshot}
            alt="Brian Li"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-outline">
          Brian Li
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-300">
          CS @ University of Illinois
        </p>

        {/* Social icons */}
        <div className="mt-3 flex gap-3 pointer-events-auto">
          <a
            href="https://github.com/extramediumdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <img
              src={githubIcon}
              alt="GitHub"
              className="w-4 h-4 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-60 hover:opacity-100 invert"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/brian-li-0748a426a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              className="w-4 h-4 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-60 hover:opacity-100 invert"
            />
          </a>
          <a
            href="https://instagram.com/librianli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <img
              src={instagramIcon}
              alt="Instagram"
              className="w-4 h-4 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-60 hover:opacity-100 invert"
            />
          </a>
        </div>

        {/* About Me section - compact */}
        <div className="mt-3 pt-2 border-t border-slate-700/40 max-w-sm">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Hello! I'm a second-year Computer Science student interested in ML + quant with a background in competitive math & coding. 
            I've worked on infrastructure at <span className="text-slate-400">State Farm</span> and 
            will be at <span className="text-slate-400">Roblox</span> + building a AI food discovery startup next summer in the Bay Area. Outside of work, 
            you'll find me playing volleyball, travelling, or hanging out with friends/family. 
            Thanks for stopping by!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
