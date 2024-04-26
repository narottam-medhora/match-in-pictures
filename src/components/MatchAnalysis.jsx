import React from "react";
import Pitch from "./Pitch";
import HalftimeIcon from "./HalftimeIcon";

function MatchAnalysis({ minute, stepProgress, touchCoordinates }) {
  return (
    <div
      id="analysis-container"
      style={{ opacity: minute === "analysis" ? 1 : 0 }}
    >
      <div id="analysis-container--text">
        <HalftimeIcon stepProgress={stepProgress} />
        <h1
          id="analysis-header"
          style={{ opacity: stepProgress > 0.05 ? 1 : 0 }}
        >
          Match <span id="analysis-subhead">analysis</span>
        </h1>
        <hr style={{ opacity: stepProgress > 0.5 ? 1 : 0 }} />
        <p
          id="analysis-analysis"
          style={{
            opacity: stepProgress > 0.5 ? 1 : 0,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit maiores
          fugiat numquam similique beatae, ipsa ullam suscipit harum. Voluptatem
          neque, ipsa cumque labore aperiam error omnis dignissimos tempore nemo
          aut. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
          perferendis dicta atque dolores facere rem quasi suscipit consequatur
          ipsum. Harum fugit quas unde aliquid quisquam tenetur officiis vero
          saepe voluptas!
        </p>
      </div>
      <Pitch stepProgress={stepProgress} touchCoordinates={touchCoordinates} />
    </div>
  );
}

export default MatchAnalysis;
