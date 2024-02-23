/* eslint-disable react/prop-types */

// Import components
import HalftimeIcon from "../assets/HalftimeIcon";
import Pitch from "./Pitch";

function Halftime({ minute, touchCoordinates, stepProgress }) {
  return (
    <>
      <div
        id="halftime-container"
        // If the minute value is 45 and the last halftime step container has
        // not been scrolled past, show the container
        style={{
          opacity: minute === 45 ? 1 : 0,
        }}
      >
        <div id="halftime-container--text">
          <HalftimeIcon stepProgress={stepProgress} />
          <h1
            id="halftime-header"
            style={{
              opacity: stepProgress > 0.4 && stepProgress < 0.8 ? 1 : 0,
            }}
          >
            Half time
            <span id="halftime-subhead">analysis</span>
          </h1>
          <h1
            id="second-half--header"
            style={{
              opacity: minute === 45 && stepProgress > 0.8 ? 1 : 0,
            }}
          >
            Second
            <span id="second-half--subhead">half</span>
          </h1>
          <hr
            style={{
              opacity: stepProgress > 0.4 && stepProgress < 0.8 ? 1 : 0,
            }}
          />
          <p
            id="halftime-analysis"
            style={{
              opacity: stepProgress > 0.5 && stepProgress < 0.8 ? 1 : 0,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <Pitch
          stepProgress={stepProgress}
          touchCoordinates={touchCoordinates}
        />
      </div>
    </>
  );
}

export default Halftime;
