/* eslint-disable react/prop-types */
import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

// Import styles
import "../styles/Halftime.css";

// Import components
import HalftimeIcon from "./HalftimeIcon";
import Pitch from "./Pitch";

function Halftime({ touchCoordinates }) {
  const [activeStep, setActiveStep] = useState(0);

  function onStepEnter(obj) {
    setActiveStep(obj.data);
  }

  return (
    <section id="scroll-container--half">
      <div id="sticky-container--half">
        <div id="sticky-container--half_text">
          <HalftimeIcon activeStep={activeStep} />
          <h1 id="halftime-header" style={{ opacity: activeStep >= 3 ? 1 : 0 }}>
            Half time <br />
            <span
              id="halftime-subhead"
              style={{ opacity: activeStep >= 4 ? 1 : 0 }}
            >
              analysis
            </span>
          </h1>
          <hr style={{ opacity: activeStep >= 4 ? 1 : 0 }} />
          <p
            id="halftime-analysis"
            style={{ opacity: activeStep >= 4 ? 1 : 0 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
        <Pitch touchCoordinates={touchCoordinates} activeStep={activeStep} />
      </div>
      <Scrollama offset={0.8} onStepEnter={onStepEnter}>
        {[1, 2, 3, 4, 5].map((_, stepIndex) => {
          return (
            <Step data={stepIndex} key={stepIndex}>
              <div className="step-container--half" />
            </Step>
          );
        })}
      </Scrollama>
    </section>
  );
}

export default Halftime;
