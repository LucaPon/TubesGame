import "./App.css";
import Step from "./components/Step/Step";
import Tube from "./components/Tube/Tube";

import React, { useState, useEffect } from "react";

function App() {
  const Status = {
    RUNNING: "RUNNING",
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
  };

  const TIMER_TOTAL = 30;
  const WEIGHT_GOAL = 15;

  const [gameStatus, setGameStatus] = useState(Status.STOPPED);
  const [isFirstStart, setIsFirstStart] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_TOTAL);
  const [startTime, setStartTime] = useState(null);

  const getRandomWeight = () => Math.floor((Math.random() * 4 + 1) * 10) / 10;
  const getRandomSpeed = () => Math.random() + 3;

  const [tubes, setTubes] = useState([
    {
      id: 0,
      weight: getRandomWeight(),
      speedMultiplier: getRandomSpeed(),
      active: true,
      waterLevel: 0,
    },
    {
      id: 1,
      weight: getRandomWeight(),
      speedMultiplier: getRandomSpeed(),
      active: true,
      waterLevel: 0,
    },
    {
      id: 2,
      weight: getRandomWeight(),
      speedMultiplier: getRandomSpeed(),
      active: true,
      waterLevel: 0,
    },
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
    setTubes(
      tubes.map((tube) => ({
        ...tube,
        active: true,
        waterLevel: 0,
        weight: isFirstStart ? tube.weight : getRandomWeight(),
        speed: getRandomSpeed(),
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

  useEffect(() => {
    let interval = null;

    if (gameStatus === Status.RUNNING) {
      if (timeRemaining === 0) {
        setTubes(
          tubes.map((tube) => {
            return { ...tube, active: false };
          })
        );
      }

      if (tubes.filter((tube) => tube.active).length === 0) {
        setGameStatus(Status.PAUSED);
      }

      if (startTime !== null && timeRemaining > 0) {
        interval = setInterval(() => {
          var msFromStart = Date.now() - startTime;

          setTubes(
            tubes.map((tube) =>
              tube.active
                ? {
                    ...tube,
                    waterLevel:
                      (msFromStart / 1000) * tube.speedMultiplier > 100
                        ? 100
                        : (msFromStart / 1000) * tube.speedMultiplier,
                    active: tube.waterLevel !== 100 && tube.active,
                  }
                : tube
            )
          );

          setTimeRemaining(TIMER_TOTAL - Math.floor(msFromStart / 1000));
        }, 10);
      }

      var actualWeight = tubes.reduce(
        (accum, item) =>
          accum + Math.floor((item.weight + item.waterLevel / 10) * 10) / 10,
        0
      );

      if (actualWeight > WEIGHT_GOAL) {
        setGameStatus(Status.PAUSED);
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStatus, startTime, timeRemaining, tubes]);

  return (
    <div className="App">
      <div className="head">
        <h1 className="text-white">
          {("0" + Math.floor(timeRemaining / 60)).slice(-2)}:
          {("0" + (timeRemaining % 60)).slice(-2)}
        </h1>
        <h1 className="text-white">GOAL: {WEIGHT_GOAL}</h1>
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
