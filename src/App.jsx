// src/App.jsx
import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Navbar, Portfolio, Resume } from "./components";
import Scene3D from './components/Scene3D';
import Submitted from './components/Submitted';
import './App.css';

const App = () => {
  const wrapperRef = useRef(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative z-0">
              <Navbar />

              <div className="wrapper" ref={wrapperRef}>
                {/* HOME: Scene3D as background */}
                <section id="Home" className="relative h-screen w-full overflow-hidden">
                  <div className="absolute inset-0 -z-10">
                    <Scene3D />
                  </div>
                  <Home />
                </section>

                <section id="portfolio" className="relative z-30 mt-[-2px]">
                  <Portfolio />
                </section>

                <section id="resume" className="relative z-30">
                  <Resume />
                </section>
              </div>
            </div>
          }
        />

        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
