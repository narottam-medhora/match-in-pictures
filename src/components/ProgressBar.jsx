/* eslint-disable react/prop-types */
// Import styles
import "../styles/ProgressBar.css";

// Create an array of 90 elements with the 45th element set to 'HT"
const arr = Array(91)
  .fill()
  .map((_, i) => (i === 45 ? "HT" : i));

function ProgressBar({ minute }) {
  const progressBars = arr.map((step) => {
    return step === "HT" ? (
      <div className="bar" id="halftime" key="bar-halftime">
        <p
          style={{
            color: minute >= 45 || minute === "ft" ? "#ff7676" : "white",
          }}
        >
          HT
        </p>
      </div>
    ) : (
      <div
        key={step}
        className={
          step <= minute || minute === "ft" ? "bar active" : "bar inactive"
        }
      />
    );
  });

  return <div className="progress-bar">{progressBars}</div>;
}

export default ProgressBar;
