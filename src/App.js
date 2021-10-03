import "./App.css";
import Step from "./components/Step/Step";
import Tube from "./components/Tube/Tube";

function App() {
  return (
    <div className="App">
      <div className="head">
        <h1 className="text-white">00:30</h1>
        <h1 className="text-white">GOAL: 45</h1>
      </div>

      <div className="game">
        <div className="tubes">
          <Tube />
          <Tube />
          <Tube />
        </div>

        <div className="steps">
          <Step />
        </div>
      </div>
    </div>
  );
}

export default App;
