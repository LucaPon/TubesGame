import "./Box.css";

const Box = ({ tube, boxPressed }) => {
  return (
    <div
      className={`box ${tube.active && "active"}`}
      onClick={() => boxPressed(tube.id)}
    >
      {tube.weight}
    </div>
  );
};

export default Box;
