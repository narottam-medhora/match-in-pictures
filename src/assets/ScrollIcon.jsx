function ScrollIcon() {
  return (
    <svg id="hero-scrollcontainer--icon" width={18} height={50}>
      <g id="mouse">
        <rect x="1" y="1" width="15.81" height="25" rx="7.91" ry="7.91" />
      </g>
      <g id="wheel">
        <line x1="8.91" y1="5.53" x2="8.91" y2="11.64" />
        <g id="chevron">
          <line x1="1" y1="29.13" x2="8.91" y2="33.63" />
          <line x1="16.81" y1="29.25" x2="8.91" y2="33.63" />
        </g>
      </g>
    </svg>
  );
}

export default ScrollIcon;
