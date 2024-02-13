/* eslint-disable react/prop-types */
import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

// Import the styles
import "../styles/FirstHalf.css";

// Import the data
import data from "../data/data.json";

// Import components
import ProgressBar from "./ProgressBar";
import Halftime from "./Halftime";

function FisrtHalf({ touchCoordinates }) {
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
        id={`image-container`}
        style={{
          background:
            d.gameStage === "ht"
              ? "black"
              : `center/cover no-repeat url('/${d.image}')`,

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
    <section id="scroll-container">
      <div id="sticky-container">
        {/* The series of divs containing the background images */}
        {backgroundImages}
        {/* Don't show the progress bar during the halftime analysis section */}
        <ProgressBar minute={minute} />
        {/* Show the halftime component only when the minute value is 'ht' */}
        <Halftime
          minute={minute}
          stepId={stepId}
          touchCoordinates={touchCoordinates}
        />
      </div>
      <Scrollama offset={0.8} onStepEnter={onStepEnter} debug>
        {data.map((d, stepIndex) => {
          return (
            <Step data={{ ...d, stepIndex }} key={stepIndex}>
              <div
                className={`step-container ${d.textPosition} ${
                  d.gameStage === "ht" && "ht"
                }`}
              >
                <p className="step-heading">{d.heading}</p>
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
