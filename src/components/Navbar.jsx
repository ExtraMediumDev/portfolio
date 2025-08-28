import React, { useEffect, useState } from "react";
import { close, menu } from "../assets";
import { navLinks } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  // Track which section is in view
  useEffect(() => {
    // Watch all sections/divs that have an id
    const sections = Array.from(document.querySelectorAll("section[id], div[id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the intersecting entry with the largest visible area
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      {
        // shrink the root to a center band so only one section is "active" at a time
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
      {/* Desktop: clean left-side rail */}
      <nav className="hidden sm:flex fixed top-0 left-0 h-screen z-40 items-center pl-6">
        <ul className="flex flex-col gap-6 text-left">
          {navLinks.map((nav) => {
            const isActive = active.toLowerCase() === nav.id.toLowerCase();
            return (
              <li key={nav.id} className="relative">
                {/* Active bar */}
                <span
                  className={`absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded bg-slate-900 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <a
                  href={`#${nav.id}`}
                  onClick={() => setActive(nav.id)}
                  className={`text-[18px] lg:text-[20px] font-semibold transition-colors ${
                    isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {nav.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: minimal toggle + sheet */}
      <nav className="sm:hidden fixed top-4 left-4 z-40">
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-md bg-white/70 backdrop-blur border border-slate-200"
        >
          <img
            src={open ? close : menu}
            alt="menu"
            className="w-6 h-6 object-contain"
          />
        </button>

        {open && (
          <div className="mt-3 p-3 rounded-xl bg-white/90 backdrop-blur border border-slate-200 shadow-sm">
            <ul className="flex flex-col gap-3">
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.id}`}
                    onClick={() => setOpen(false)}
                    className={`text-[16px] font-medium ${
                      active === nav.id
                        ? "text-slate-900"
                        : "text-slate-600 hover:text-slate-900"
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
