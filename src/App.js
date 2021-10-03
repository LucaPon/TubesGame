import "./App.css";
import Step from "./components/Step/Step";
import Tube from "./components/Tube/Tube";
import { useState } from "react";

function App() {
  const [tubes, setTubes] = useState([
    {
      id: 0,
      weight: Math.floor((Math.random() * 4 + 1) * 10) / 10,
      speed: Math.floor((Math.random() * 4 + 1) * 10) / 10,
      active: true,
    },
    {
      id: 1,
      weight: Math.floor((Math.random() * 4 + 1) * 10) / 10,
      speed: Math.floor((Math.random() * 4 + 1) * 10) / 10,
      active: true,
    },
    {
      id: 2,
      weight: Math.floor((Math.random() * 4 + 1) * 10) / 10,
      speed: Math.floor((Math.random() * 4 + 1) * 10) / 10,
      active: true,
    },
  ]);

  const boxPressed = (id) => {
    setTubes(
      tubes.map((tube) => (tube.id === id ? { ...tube, active: false } : tube))
    );
  };

  return (
    <div className="App">
      <div className="head">
        <h1 className="text-white">00:30</h1>
        <h1 className="text-white">GOAL: 45</h1>
      </div>

      <div className="game">
        <div className="tubes">
          <Tube tube={tubes[0]} boxPressed={boxPressed} />
          <Tube tube={tubes[1]} boxPressed={boxPressed} />
          <Tube tube={tubes[2]} boxPressed={boxPressed} />
        </div>

        <div className="steps">
          <Step className="step" value="9" />
          <Step className="step" value="8" />
          <Step className="step" value="7" />
          <Step className="step" value="6" />
          <Step className="step" value="5" />
          <Step className="step" value="4" />
          <Step className="step" value="3" />
          <Step className="step" value="2" />
          <Step className="step" value="1" />
        </div>
      </div>
    </div>
  );
}

export default App;
