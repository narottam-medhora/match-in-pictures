import "../styles/HalftimeIcon.css";

function HalftimeIcon({ activeStep }) {
  return (
    <svg id="halftime-icon" width={150} height={100}>
      <g id="rect-1" opacity={activeStep >= 0 ? 1 : 0}>
        <polygon
          className="st0"
          points="86.61,36.29 14.16,36.29 24.67,22.78 96.56,22.78"
        />
        <polygon
          className="st0"
          points="2.93,50 24.36,22.84 32.73,35.84 21.74,49.76"
        />
        <polygon
          className="st0"
          points="122.04,36.02 104.74,36.29 114.64,22.96 131.71,22.96"
        />
      </g>
      <g id="rect-2" opacity={activeStep >= 1 ? 1 : 0}>
        <polygon
          className="st1"
          points="93.93,49.9 21.48,49.9 31.99,36.39 103.88,36.39"
        />
        <polygon
          className="st1"
          points="10.25,63.61 31.68,36.46 40.05,49.45 29.07,63.37"
        />
        <polygon
          className="st1"
          points="129.88,49.54 112.58,49.81 122.48,36.48 139.55,36.48"
        />
      </g>
      <g id="rect-3" opacity={activeStep >= 2 ? 1 : 0}>
        <polygon
          className="st2"
          points="101.51,63.51 29.05,63.51 39.57,50 111.46,50"
        />
        <polygon
          className="st2"
          points="17.83,77.22 39.26,50.07 47.63,63.06 36.64,76.99"
        />
        <polygon
          className="st2"
          points="137.4,63.16 120.1,63.42 130,50.09 147.07,50.09"
        />
      </g>
    </svg>
  );
}

export default HalftimeIcon;