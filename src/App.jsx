import React from 'react';
import Scene3D from './components/Scene3D';
import './App.css';


function App() {
  return (
    <div className="App">
      <div id="scene-container">
        <Scene3D />
      </div>
    </div>
  );
}

function MyButton() {
  return (
    <>
      <button>lalala {1+1}</button>
      {1+1}
    </>
    
  );
}

export default App;
