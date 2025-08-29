import { githubIcon, linkedinIcon, instagramIcon } from "../assets";

const Home = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 text-outline">
        Brian Li
      </h1>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 text-center">
        CS @ University of Illinois
      </p>

      {/* centered social icons (moved from Navbar) */}
      <div className="mt-6 flex gap-5 justify-center pointer-events-auto">
        <a
          href="https://github.com/extramediumdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-900 transition-colors"
        >
          <img
            src={githubIcon}
            alt="GitHub"
            className="w-6 h-6 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-50 hover:opacity-100"
            style={{ filter: "none" }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/brian-li-0748a426a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-900 transition-colors"
        >
          <img
            src={linkedinIcon}
            alt="LinkedIn"
            className="w-6 h-6 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-50 hover:opacity-100"
            style={{ filter: "none" }}
          />
        </a>
        <a
          href="https://instagram.com/librianli"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-900 transition-colors"
        >
          <img
            src={instagramIcon}
            alt="Instagram"
            className="w-6 h-6 transform hover:scale-110 hover:rotate-6 transition-transform duration-300 opacity-50 hover:opacity-100"
            style={{ filter: "none" }}
          />
        </a>
      </div>
    </section>
  );
};

export default Home;
