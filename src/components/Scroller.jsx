import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

// Import the styles
import "../styles/Scroller.css";

// Import the data
import data from "../data/data.json";

// Import components
import ProgressBar from "./ProgressBar";

const Scroller = () => {
  // Use state to track how many minutes have passed
  const [minute, setMinute] = useState(0);

  // Use state to track which image should be displayed
  const [stepId, setStepId] = useState(1);

  /* 
    Create a series of <div> elements based on the data. The z-index of these elements
    increases with the stepID. The opacity of the elements are set to 0, except when they
    are active. We use a simple CSS opacity animation to transition between the visible elements
   */
  const backgroundImages = data.map((d, i) => {
    return (
      <div
        className={`image-container`}
        style={{
          backgroundImage: `url('/${d.image}')`,
          zIndex: `${d.id}`,
          opacity: `${d.id === stepId ? 1 : 0}`,
        }}
        key={i}
      />
    );
  });

  // Update the background image container when a step is entered
  function onStepEnter({ ...obj }) {
    setMinute(obj.data.minute);
    setStepId(obj.data.id);
  }

  return (
    <div className="scroll-container">
      <div className="sticky-container">
        <ProgressBar minute={minute} />
        {backgroundImages}
      </div>
      <Scrollama offset={0.8} onStepEnter={onStepEnter} debug>
        {data.map((d, stepIndex) => {
          return (
            <Step data={{ ...d, stepIndex }} key={stepIndex}>
              <div className={`step-container ${d.textPosition}`}>
                <p className="step-heading">{d.heading}</p>
                <p>{d.text}</p>
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </div>
  );
};

export default Scroller;
