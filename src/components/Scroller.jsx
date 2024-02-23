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

function Scroller({ touchCoordinates }) {
  // Use state to track how many minutes have passed
  const [minute, setMinute] = useState(0);

  // Use state to track which image should be displayed
  const [stepId, setStepId] = useState(1);

  // Use state to track when the last HT slide was exited
  const [isHalfTimeOver, setIsHalfTimeOver] = useState(false);

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
        className={`image-container`}
        style={{
          background:
            d.gameStage === "ht"
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

    // If the last HT step is scrolled back to, set the corresponding state to false
    if (obj.data.minute === 45 && obj.direction === "up") {
      setIsHalfTimeOver(false);
    }

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
    // If the last HT step is scrolled past, set the corresponding state to true
    // ! 14 just happens to be the last value of the 'ht' slide for the Grealish data
    if (obj.data.id === 14) {
      setIsHalfTimeOver(true);
    }

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
        <Halftime
          minute={minute}
          stepId={stepId}
          touchCoordinates={touchCoordinates}
          isHalfTimeOver={isHalfTimeOver}
        />

        <button
          className="burst-button"
          onClick={runBurst}
          style={{ opacity: isBurstButtonVisible ? 1 : 0 }}
        >
          {isBurstVisible ? "Watch again" : "Show burst"}
        </button>

        {isBurstVisible && (
          <Burst
            burstImages={burstImages}
            visibleImageIndex={visibleImageIndex}
            setVisibleImageIndex={setVisibleImageIndex}
          />
        )}
        <AnnotatedSlide
          isAnnotatedSlideVisible={isAnnotatedSlideVisible}
          stepProgress={stepProgress}
        />
      </div>
      <Scrollama
        offset={0.8}
        onStepEnter={onStepEnter}
        onStepExit={onStepExit}
        onStepProgress={onStepProgress}
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
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </section>
  );
}

export default Scroller;
