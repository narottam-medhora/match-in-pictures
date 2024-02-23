import React from "react";

function Fulltime({ minute }) {
  return (
    <div id="fulltime-container" style={{ opacity: minute === "ft" ? 1 : 0 }}>
      <div id="fulltime-gradient"></div>
      <h1 id="fulltime-header">
        Full <span id="fulltime-subhead">Time</span>
      </h1>
    </div>
  );
}

export default Fulltime;
