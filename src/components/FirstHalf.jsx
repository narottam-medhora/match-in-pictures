import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

// Import the styles
import "../styles/FirstHalf.css";

// Import the data
import data from "../data/data.json";

// Import components
import ProgressBar from "./ProgressBar";

function FisrtHalf({ offset }) {
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
        id={`image-container--first`}
        style={{
          background: `url('/${d.image}'), linear-gradient(
            90deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(116, 116, 116, 1) 35%,
            rgba(255, 255, 255, 1) 100%
          )`,
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
    <section id="scroll-container--first">
      <div id="sticky-container--first">
        <ProgressBar minute={minute} />
        {backgroundImages}
      </div>
      <Scrollama offset={offset} onStepEnter={onStepEnter} debug>
        {data.map((d, stepIndex) => {
          return (
            <Step data={{ ...d, stepIndex }} key={stepIndex}>
              <div className={`step-container--first ${d.textPosition}`}>
                <p className="step-heading--first">{d.heading}</p>
                <p>{d.text}</p>
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </section>
  );
}

export default FisrtHalf;
