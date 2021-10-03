import Box from "../Box/Box";
import "./Tube.css";

const Tube = ({ tube, boxPressed }) => {
  return (
    <div className="tube_container">
      <div className="tube" />
      <div className="container">
        <Box className="box" tube={tube} boxPressed={boxPressed} />
        <div className="water"></div>
      </div>
    </div>
  );
};

export default Tube;
