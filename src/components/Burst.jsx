/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";

function Burst({ visibleImageIndex, setVisibleImageIndex, burstImages }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (visibleImageIndex < burstImages.length - 1) {
        setVisibleImageIndex((prevState) => prevState + 1);
      }
    }, 1000);

    return () => clearInterval(timeout);
  }, [visibleImageIndex]);

  // For each item in the image array, create a div with the corresponding background image
  const imageDivs = burstImages.map((img, i) => {
    return (
      <>
        <div
          key={i}
          className="image-container"
          style={{
            background: `center/cover no-repeat url('/${img}')`,
            height: "100svh",
            width: "100svw",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: `${i === visibleImageIndex ? 1 : 0}`,
            zIndex: i,
            transition: "opacity 500ms ease-in",
          }}
        />
      </>
    );
  });

  return <div>{imageDivs}</div>;
}

export default Burst;
