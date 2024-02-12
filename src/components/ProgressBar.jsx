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
        <p>HT</p>
      </div>
    ) : (
      <div
        key={step}
        className={step <= minute ? "bar active" : "bar inactive"}
      />
    );
  });

  return <div className="progress-bar">{progressBars}</div>;
}

export default ProgressBar;
