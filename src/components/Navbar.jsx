import React, { useEffect, useState } from "react";
import { close, menu } from "../assets";
import { navLinks } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  // Track which section is in view
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id], div[id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => sections.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      {/* Desktop: horizontal top-right nav */}
      <nav className="hidden sm:flex fixed top-0 right-0 z-40 items-center pr-8 pt-6">
        <ul className="flex flex-row gap-8">
          {navLinks.map((nav) => {
            const isActive = active.toLowerCase() === nav.id.toLowerCase();
            return (
              <li key={nav.id} className="relative">
                <a
                  href={`#${nav.id}`}
                  onClick={() => setActive(nav.id)}
                  className={`text-[15px] lg:text-[16px] font-medium tracking-wide uppercase transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {nav.title}
                </a>
                {/* Active underline indicator */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: minimal toggle + sheet */}
      <nav className="sm:hidden fixed top-4 right-4 z-40">
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-md bg-zinc-900/90 backdrop-blur border border-zinc-700"
        >
          <img
            src={open ? close : menu}
            alt="menu"
            className="w-6 h-6 object-contain invert"
          />
        </button>

        {open && (
          <div className="mt-3 p-4 rounded-xl bg-zinc-900/95 backdrop-blur border border-zinc-700 shadow-lg">
            <ul className="flex flex-col gap-3">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    onClick={() => setOpen(false)}
                    className={`text-[14px] font-medium uppercase tracking-wide ${
                      active === nav.id
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
