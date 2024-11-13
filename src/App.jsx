import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Contact, Navbar, Portfolio, Experience } from "./components";
import Scene3D from './components/Scene3D';
import Submitted from './components/Submitted';
import './App.css';

const App = () => {
  const wrapperRef = useRef(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main structure with background and navigation */}
        <Route path="/" element={
          <div className='relative z-0 bg-primary'>
            <div id="scene-container" className="fixed inset-0 -z-10 h-screen w-screen">
              <Scene3D />
            </div>
            <Navbar />
            <div className='wrapper' ref={wrapperRef}>
              <div id="Home" className=''>
                <Home scrollContainer={wrapperRef} />
              </div>
              <div id="portfolio" className='relative z-30 bg-primary mt-[-2px]'>
                <Portfolio />
              </div>
              <div id="experience" className='relative z-30 bg-primary'>
                <Experience />
              </div>
              <div id="contact" className='bg-primary'>
                <Contact />
              </div>
            </div>
          </div>
        } />

        {/* Submitted page route */}
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
