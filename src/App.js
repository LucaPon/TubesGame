import "./App.css";
import Step from "./components/Step/Step";
import Tube from "./components/Tube/Tube";
import rotateIcon from "./assets/rotate.png";

import React, { useState, useEffect } from "react";

function App() {
  const Status = {
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
  };

  const getRandomWeightGoal = () =>
    Math.floor((Math.random() * 5 + 30) * 10) / 10; // l'obiettivo da raggiungere è un valore random che va da 30 a 35
  const getRandomWeight = () => Math.floor((Math.random() * 4 + 2) * 10) / 10; // Il peso iniziale di ogni cassa è un valore random che va da 2 a 5
  const getRandomSpeed = () => Math.random() * 3 + 3; //la velocità in cui aumenta il liquido è un valore random che va da 3 a 6 e rappresenta la % di aumento al secondo (totale 100%)
  const createTube = (id) => {
    return {
      id: id,
      weight: getRandomWeight(),
      speedMultiplier: getRandomSpeed(),
      active: true,
      waterLevel: 0,
    };
  };

  const TIMER_TOTAL = 30; //secondi di countdown
  const [weightGoal, setWeightGoal] = useState(getRandomWeightGoal());

  const [gameStatus, setGameStatus] = useState(Status.STOPPED);
  const [isFirstStart, setIsFirstStart] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_TOTAL);
  const [startTime, setStartTime] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [tubes, setTubes] = useState([
    createTube(0),
    createTube(1),
    createTube(2),
  ]);

  const boxPressed = (id) => {
    if (gameStatus === Status.RUNNING) {
      setTubes(
        tubes.map((tube) =>
          tube.id === id ? { ...tube, active: false } : tube
        )
      );
    }
  };

  const startGame = () => {
    setIsFirstStart(false);
    setStartTime(Date.now());
    setGameStatus(Status.RUNNING);
  };

  const resetGame = () => {
    setStartTime(null);
    setTimeRemaining(TIMER_TOTAL);
    setTotalWeight(0);
    setShowResult(false);
    setWeightGoal(getRandomWeightGoal());
    setTubes(
      tubes.map((tube) => ({
        ...tube,
        active: true,
        waterLevel: 0,
        weight: isFirstStart ? tube.weight : getRandomWeight(),
        speedMultiplier: getRandomSpeed(),
      }))
    );

    setGameStatus(Status.STOPPED);
  };

  const togglePlay = () => {
    if (gameStatus === Status.PAUSED) {
      resetGame();
    }
    if (gameStatus === Status.STOPPED) {
      startGame();
    }
    if (gameStatus === Status.RUNNING) {
      setGameStatus(Status.PAUSED);
    }
  };

  const computeTotalWeight = () => {
    //restituisce il peso totale ( somma dei pesi delle scatole )
    return tubes.reduce(
      (accum, item) =>
        accum + Math.floor((item.weight + item.waterLevel / 10) * 10) / 10,
      0
    );
  };

  const deactivateTubes = () => {
    setTubes(
      tubes.map((tube) => {
        return { ...tube, active: false };
      })
    );
  };

  const getWaterLevel = (msFromStart, speedMultiplier) => {
    var newWaterLevel = (msFromStart / 1000) * speedMultiplier;
    return newWaterLevel > 100 ? 100 : newWaterLevel;
  };

  const updateTubesWaterLevel = (msFromStart) => {
    //se i tubi sono attivi aggiorno il livello del liquido in base allo speedMultiplier e al tempo trascorso da inizio gioco
    setTubes(
      tubes.map((tube) =>
        tube.active
          ? {
              ...tube,
              waterLevel: getWaterLevel(msFromStart, tube.speedMultiplier),
              active: tube.waterLevel !== 100 && tube.active,
            }
          : tube
      )
    );
  };

  useEffect(() => {
    let interval = null;

    if (gameStatus === Status.RUNNING) {
      var totalWeight = computeTotalWeight();
      setTotalWeight(Math.floor(totalWeight * 10) / 10);

      if (totalWeight > weightGoal) {
        //se il totale supera il valore dell'obiettivo
        setShowResult(true);
        setGameStatus(Status.PAUSED);
      }

      if (timeRemaining === 0) {
        //se termina il countdown
        deactivateTubes();
      }

      if (tubes.filter((tube) => tube.active).length === 0) {
        //se non ci sono più tubi attivi
        setGameStatus(Status.PAUSED);
        setShowResult(true);
      }

      if (startTime !== null && timeRemaining > 0) {
        interval = setInterval(() => {
          var msFromStart = Date.now() - startTime;
          updateTubesWaterLevel(msFromStart);
          setTimeRemaining(TIMER_TOTAL - Math.floor(msFromStart / 1000));
        }, 10);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStatus, startTime, timeRemaining, tubes]);

  return (
    <div className="App">
      <div className="rotate">
        <img src={rotateIcon} />
      </div>

      <div className="head">
        {!showResult && (
          <h1>
            {("0" + Math.floor(timeRemaining / 60)).slice(-2)}:
            {("0" + (timeRemaining % 60)).slice(-2)}
          </h1>
        )}

        <h1>
          {showResult && totalWeight > weightGoal && "HAI PERSO!!!"}
          {showResult && totalWeight === weightGoal && "HAI VINTO!!!"}
          {(!showResult || totalWeight < weightGoal) &&
            "Obiettivo: " + weightGoal}
        </h1>

        {showResult && (
          <h1>{"Punteggio: " + totalWeight + "/" + weightGoal}</h1>
        )}

        <button onClick={togglePlay}>
          {gameStatus === Status.STOPPED
            ? "START"
            : gameStatus === Status.PAUSED
            ? "RESET"
            : "STOP"}
        </button>
      </div>
      <div className="game">
        <div className="tubes">
          <Tube tube={tubes[0]} boxPressed={boxPressed} />
          <Tube tube={tubes[1]} boxPressed={boxPressed} />
          <Tube tube={tubes[2]} boxPressed={boxPressed} />
        </div>

        <div className="steps">
          <Step className="step" value="10" />
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
