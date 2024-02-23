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
import Burst from "./Burst";
import AnnotatedSlide from "./AnnotatedSlide";
import Fulltime from "./Fulltime";

function Scroller({ touchCoordinates }) {
  // Use state to track how many minutes have passed
  const [minute, setMinute] = useState(0);

  // Use state to track which image should be displayed
  const [stepId, setStepId] = useState(1);

  // Use state to set the visibility of the burst button
  const [isBurstButtonVisible, setIsBurstButtonVisible] = useState(false);

  // Use state to set the visibility of the burst
  const [isBurstVisible, setIsBurstVisible] = useState(false);

  // Store the index of the first image to be displayed
  const [visibleImageIndex, setVisibleImageIndex] = useState(0);

  // Store the array of images for the burst container
  const [burstImages, setBurstImages] = useState([]);

  // Store state to manage the visibility of the annotated slide
  const [isAnnotatedSlideVisible, setIsAnnotatedSlideVisible] = useState(false);

  // Store state to track the step progress
  const [stepProgress, setStepProgress] = useState(0);

  /* 
    Create a series of <div> elements based on the data. The z-index of these elements
    increases with the stepID. The opacity of the elements are set to 0, except when they
    are active. We use a simple CSS opacity animation to transition between the visible elements
   */

  // scale(1.8) translate(-40px, -140px)
  const backgroundImages = data.map((d, i) => {
    return (
      <div
        className={`image-container ${d.minute === "ht" ? "ht" : ""}`}
        style={{
          background:
            d.minute === "ht"
              ? "black"
              : `center/cover no-repeat url('/${d.image}')`,

          zIndex: `${d.id}`,
          opacity: `${d.id === stepId ? 1 : 0}`,
          transform: `${
            d.isAnnotated && isAnnotatedSlideVisible
              ? "scale(1.5) translate(-215px, -150px)"
              : "scale(1)"
          }`,
        }}
        key={i}
      />
    );
  });

  // Run the burst when the button is clicked
  function runBurst() {
    setVisibleImageIndex(0);
    setIsBurstVisible(true);
  }

  // Update the background image container when a step is entered
  function onStepEnter({ ...obj }) {
    setMinute(obj.data.minute);
    setStepId(obj.data.id);

    // If the step contains a burst, set the array of images for that specific burst
    if (obj.data.burst) {
      setBurstImages(obj.data.burstImages);
    }

    // If the step contains an annotated slide, set the corresponding state to true
    if (obj.data.isAnnotated) {
      setIsAnnotatedSlideVisible(true);
    }
  }

  function onStepExit({ ...obj }) {
    // If the step was annotated, reset the value of isAnnotatedSlide visible
    if (obj.data.isAnnotated) {
      setIsAnnotatedSlideVisible(false);
    }
  }

  function onStepProgress({ ...obj }) {
    // If the step contains a burst, set the visibility of the burst button to true
    if (obj.data.burst && obj.progress > 0.5) {
      setIsBurstButtonVisible(true);
    } else {
      setIsBurstButtonVisible(false);
      setIsBurstVisible(false);
    }

    setStepProgress(obj.progress);
  }

  return (
    <section id="scroll-container">
      <div id="sticky-container">
        {/* The series of divs containing the background images */}
        {!isBurstVisible && backgroundImages}
        <ProgressBar minute={minute} />
        {/* Show the component that contains the halftime analysis and data */}
        <Halftime
          minute={minute}
          stepProgress={stepProgress}
          touchCoordinates={touchCoordinates}
        />
        <button
          className="burst-button"
          onClick={runBurst}
          style={{ opacity: isBurstButtonVisible ? 1 : 0 }}
        >
          {isBurstVisible ? "Watch again" : "Show burst"}
        </button>
        {/* Display the burst images when the button is clicked */}
        {isBurstVisible && (
          <Burst
            burstImages={burstImages}
            visibleImageIndex={visibleImageIndex}
            setVisibleImageIndex={setVisibleImageIndex}
          />
        )}
        {/* If a step has it's annotation property set to true, this component will be visible */}
        <AnnotatedSlide
          isAnnotatedSlideVisible={isAnnotatedSlideVisible}
          stepProgress={stepProgress}
        />
        {/* Overlay the gradient on top of the background images, but below the progress bar */}
        <div id="gradient-container" />
        <Fulltime minute={minute} />
      </div>
      <Scrollama
        offset={0.8}
        onStepEnter={onStepEnter}
        onStepExit={onStepExit}
        onStepProgress={onStepProgress}
        debug
      >
        {data.map((d, stepIndex) => {
          console.log(d);
          return (
            <Step data={{ ...d, stepIndex }} key={stepIndex}>
              <div
                className={`step-container ${d.textPosition} ${
                  d.minute === 45 ? "ht" : d.minute === "ft" ? "ft" : ""
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

export default Scroller;
