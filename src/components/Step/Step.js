import "./Step.css";

const Step = ({ value }) => {
  return (
    <div className="step">
      <p className="step_text">+{value}</p>
      <div className="dashed_line"></div>
    </div>
  );
};

export default Step;
