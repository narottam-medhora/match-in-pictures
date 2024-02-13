/* eslint-disable react/prop-types */
import useChartDimensions from "../hooks/useChartDimensions";

import { scaleLinear } from "d3-scale";

function Pitch({ stepId, touchCoordinates }) {
  const chartSettings = {};
  const [ref, dms] = useChartDimensions(chartSettings);

  const pitchWidth = 90;
  const pitchLength = 120;

  const xScale = scaleLinear()
    .domain([0, pitchWidth])
    .range([0, dms.boundedWidth / 2]);

  const yScale = scaleLinear()
    .domain([0, pitchLength])
    .range([0, dms.boundedHeight]);

  const touchCircles = touchCoordinates.map((d, i) => {
    return (
      <circle
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        r={5}
        fill="#FF7676"
        key={i}
        opacity={stepId >= 14 ? 1 : 0}
      ></circle>
    );
  });

  return (
    <div
      id="pitch-container"
      ref={ref}
      style={{ opacity: stepId >= 14 ? 1 : 0 }}
    >
      <svg id="pitch" width={dms.width} height={dms.height}>
        <g transform={`translate(${dms.marginLeft}, ${dms.marginTop})`}>
          <g id="pitch-markers">
            <g id="pitch-markers--outer">
              <line
                className="line"
                x1={0}
                x2={xScale(pitchWidth)}
                y1={0}
                y2={0}
              />
              <line
                className="line"
                x1={0}
                x2={xScale(pitchWidth)}
                y1={yScale(pitchLength)}
                y2={yScale(pitchLength)}
              />
              <line
                className="line"
                x1={0}
                x2={0}
                y1={yScale(0)}
                y2={yScale(pitchLength)}
              />
              <line
                className="line"
                x1={xScale(pitchWidth)}
                x2={xScale(pitchWidth)}
                y1={yScale(0)}
                y2={yScale(pitchLength)}
              />
              <line
                className="line"
                x1={0}
                x2={xScale(pitchWidth)}
                y1={yScale(pitchLength / 2)}
                y2={yScale(pitchLength / 2)}
              />
              <circle
                cx={xScale(pitchWidth / 2)}
                cy={yScale(pitchLength / 2)}
                r={xScale(10)}
                fill="none"
              />
              <circle
                cx={xScale(pitchWidth / 2)}
                cy={yScale(pitchLength / 2)}
                r={xScale(0.5)}
                fill="white"
              />
              <circle
                cx={xScale(pitchWidth / 2)}
                cy={yScale(120 - 11.5)}
                r={xScale(0.2)}
                fill="white"
              />
              <circle
                cx={xScale(pitchWidth / 2)}
                cy={yScale(11.5)}
                r={xScale(0.2)}
                fill="white"
              />
            </g>
            <g id="pitch-markers--box_1">
              <line
                className="line"
                x1={xScale(20)}
                x2={xScale(20)}
                y1={0}
                y2={yScale(16.5)}
              ></line>
              <line
                className="line"
                x1={xScale(70)}
                x2={xScale(70)}
                y1={0}
                y2={yScale(16.5)}
              ></line>
              <line
                className="line"
                x1={xScale(20)}
                x2={xScale(70)}
                y1={yScale(16.5)}
                y2={yScale(16.5)}
              ></line>
              <line
                className="line"
                x1={xScale(54.15)}
                x2={xScale(54.15)}
                y1={yScale(0)}
                y2={yScale(5.5)}
              ></line>
              <line
                className="line"
                x1={xScale(35.85)}
                x2={xScale(35.85)}
                y1={yScale(0)}
                y2={yScale(5.5)}
              ></line>
              <line
                className="line"
                x1={xScale(35.85)}
                x2={xScale(54.15)}
                y1={yScale(5.5)}
                y2={yScale(5.5)}
              ></line>
            </g>
            <g id="pitch-markers--box_2">
              <line
                className="line"
                x1={xScale(20)}
                x2={xScale(20)}
                y1={yScale(120)}
                y2={yScale(103.5)}
              ></line>
              <line
                className="line"
                x1={xScale(70)}
                x2={xScale(70)}
                y1={yScale(120)}
                y2={yScale(103.5)}
              ></line>
              <line
                className="line"
                x1={xScale(20)}
                x2={xScale(70)}
                y1={yScale(103.5)}
                y2={yScale(103.5)}
              ></line>
              <line
                className="line"
                x1={xScale(54.15)}
                x2={xScale(54.15)}
                y1={yScale(120)}
                y2={yScale(114.5)}
              ></line>
              <line
                className="line"
                x1={xScale(35.85)}
                x2={xScale(35.85)}
                y1={yScale(120)}
                y2={yScale(114.5)}
              ></line>
              <line
                className="line"
                x1={xScale(35.85)}
                x2={xScale(54.15)}
                y1={yScale(114.5)}
                y2={yScale(114.5)}
              ></line>
            </g>
          </g>
          <g id="pitch-data">{touchCircles}</g>
        </g>
      </svg>
    </div>
  );
}

export default Pitch;
