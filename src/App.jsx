import React from 'react';
import Scene3D from './components/Scene3D';
import './App.css';


function App() {
  return (
    <div className="App">
      <div id="scene-container">
        <Scene3D />
      </div>
      <div className="content">
        <div className="floating-box">
          <h1>Galactic Portfolio</h1>
          <nav>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
        <div className="floating-box">
          <h2>Welcome to My Universe</h2>
          <p>Explore the vast expanse of my digital creations!</p>
        </div>
        <div className="floating-box">
          <h2>About Me</h2>
          <p>Hi! My name is Brian Li! I'm a freshman studying Computer Science at the University of Illinois Urbana-Champaign</p>
        </div>
        <div className="floating-box">
          <h2>My Projects</h2>
          <p>Discover my constellation of amazing projects...</p>
        </div>
        <div className="floating-box">
          <h2>Contact Me</h2>
          <p>Let's create something stellar together!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
