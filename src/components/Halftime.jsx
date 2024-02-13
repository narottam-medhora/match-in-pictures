/* eslint-disable react/prop-types */
// Import styles
import "../styles/Halftime.css";

// Import components
import HalftimeIcon from "./HalftimeIcon";
import Pitch from "./Pitch";

function Halftime({ stepId, minute, touchCoordinates }) {
  return (
    <div
      id="halftime-container"
      style={{
        visibility: minute === 45 ? "visible" : "hidden",
      }}
    >
      <div id="halftime-container--text">
        <HalftimeIcon stepId={stepId} />
        <h1 style={{ opacity: stepId >= 13 ? 1 : 0 }}>Half time analysis</h1>
        <hr style={{ opacity: stepId >= 14 ? 1 : 0 }} />
        <p style={{ opacity: stepId >= 14 ? 1 : 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <Pitch stepId={stepId} touchCoordinates={touchCoordinates} />
    </div>
  );
}

export default Halftime;
