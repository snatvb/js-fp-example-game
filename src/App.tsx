import React, { useEffect, useRef } from 'react';

import * as game from './game'

import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      return game.start(canvasRef.current)
    }
  }, [])
  return (
    <div className="App">
      <canvas id="game" ref={canvasRef} />
    </div>
  );
}

export default App;
