import "./Box.css";

const Box = ({ tube, boxPressed }) => {
  return (
    <div
      className={`box ${tube.active && "active"}`}
      onClick={() => boxPressed(tube.id)}
    >
      {Math.floor((tube.weight + tube.waterLevel / 10) * 10) / 10}
    </div>
  );
};

export default Box;
