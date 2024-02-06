import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

// Import the styles
import "../styles/Scroller.css";

// Import the data
import data from "../data/data.json";

const Scroller = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [gradient, setGradient] = useState(
    "linear-gradient(90deg, rgba(4,14,33,1) 0%, rgba(138,138,138,1) 25%, rgba(255,255,255,1) 100%)"
  );
  const [showBurst, setShowBurst] = useState(false);
  console.log(showBurst);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = (data) => {
    setCurrentStepIndex(data.data.stepIndex);
    setMinutes(data.data.d.minute);
    setGradient(
      data.data.d.textPosition === "right"
        ? "linear-gradient(-90deg, rgba(4,14,33,1) 0%, rgba(138,138,138,1) 25%, rgba(255,255,255,1) 100%)"
        : "linear-gradient(90deg, rgba(4,14,33,1) 0%, rgba(138,138,138,1) 25%, rgba(255,255,255,1) 100%)"
    );

    if (data.data.d.burst) {
      setShowBurst(true);
    } else {
      setShowBurst(false);
    }
  };

  // Create an array of 90 elements with the 45th element set to 'HT"
  const arr = Array(91)
    .fill()
    .map((_, i) => (i === 45 ? "HT" : i));

  const progressBar = arr.map((step) => {
    return step === "HT" ? (
      <div className="step" key="step" style={{ marginBlockEnd: ".75em" }}>
        <p id="step-halftime">HT</p>
      </div>
    ) : (
      <div
        key={step}
        className={step <= minutes ? "step active" : " step inactive"}
      />
    );
  });

  function handleClick() {
    console.log("show burst");
  }

  return (
    <div className="scroll-container">
      <div
        className="sticky-container"
        style={{
          backgroundImage: `url('src/assets/slide_${
            currentStepIndex + 1
          }.png'), ${gradient}`,
        }}
      >
        <div className="progress-bar">{progressBar}</div>
        {showBurst && <button onClick={handleClick}>Show burst</button>}
      </div>
      <Scrollama offset={0.8} onStepEnter={onStepEnter} debug>
        {data.map((d, stepIndex) => {
          return (
            <Step data={{ d, stepIndex }} key={stepIndex}>
              <div className={`step-container ${d.textPosition}`}>
                <p className="step-heading">{d.heading}</p>
                <p>
                  {d.text} <br />
                </p>
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </div>
  );
};

export default Scroller;
