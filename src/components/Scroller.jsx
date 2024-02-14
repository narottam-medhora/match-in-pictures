/* eslint-disable react/prop-types */
import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

// Import the styles
import "../styles/Scroller.css";

// Import the data
import data from "../data/data.json";

// Import components
import ProgressBar from "./ProgressBar";
import Halftime from "./Halftime";

function Scroller({ touchCoordinates }) {
  // Use state to track how many minutes have passed
  const [minute, setMinute] = useState(0);

  // Use state to track which image should be displayed
  const [stepId, setStepId] = useState(1);

  // Use state to track when the last HT slide was exited
  const [isHalfTimeOver, setIsHalfTimeOver] = useState(false);

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
      >
        <button className="burst-button">Show burst</button>
      </div>
    );
  });

  // Update the background image container when a step is entered
  function onStepEnter({ ...obj }) {
    setMinute(obj.data.minute);
    setStepId(obj.data.id);

    // If the last HT step is scrolled back to, set the corresponding state to false
    if (obj.data.minute === 45 && obj.direction === "up") {
      setIsHalfTimeOver(false);
    }
  }

  function onStepExit({ ...obj }) {
    // If the last HT step is scrolled past, set the corresponding state to true
    // ! 14 just happens to be the last value of the 'ht' slide for the Grealish data
    if (obj.data.id === 14) {
      setIsHalfTimeOver(true);
    }
  }

  return (
    <section id="scroll-container">
      <div id="sticky-container">
        {/* The series of divs containing the background images */}
        {backgroundImages}
        <ProgressBar minute={minute} />
        <Halftime
          minute={minute}
          stepId={stepId}
          touchCoordinates={touchCoordinates}
          isHalfTimeOver={isHalfTimeOver}
        />
      </div>
      <Scrollama
        offset={0.8}
        onStepEnter={onStepEnter}
        onStepExit={onStepExit}
        debug
      >
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
                <p></p>
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </section>
  );
}

export default Scroller;
