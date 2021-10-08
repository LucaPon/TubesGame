import Box from "../Box/Box";
import "./Tube.css";

const Tube = ({ tube, boxPressed }) => {
  return (
    <div className="tube_container">
      <div className="tube" />
      <div className="container">
        <div style={{ height: tube.waterLevel + "%" }} className="water">
          <Box className="box" tube={tube} boxPressed={boxPressed} />
          <div className="wave_container">
            <div className="wave" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tube;
