import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";

// Import the styles
import "../styles/Scroller.css";

// Import the data
import data from "../data/data.json";

const Scroller = () => {
  const [minutes, setMinutes] = useState(0);

  const [showBurst, setShowBurst] = useState(false);
  const [burstImages, setBurstImages] = useState(null);
  const [wasBurstPlayed, setWasBurstPlayed] = useState(false);

  const [gradient, setGradient] = useState(
    "linear-gradient(90deg, rgba(4,14,33,1) 0%, rgba(138,138,138,1) 25%, rgba(255,255,255,1) 100%)"
  );

  const [image, setImage] = useState(`url('/slide_1.png')`);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = (data) => {
    setMinutes(data.data.d.minute);

    setImage(`url('/slide_${data.data.stepIndex + 1}.png')`);

    setBurstImages(data.data.d.burstImages);
  };

  function runBurst() {
    if (burstImages) {
      for (let i = 0; i < burstImages.length; i++) {
        setTimeout(() => {
          setImage(`url('/${burstImages[i]}')`);
        }, i * 750);
      }

      setWasBurstPlayed(true);
    }
  }

  const onStepProgress = (data) => {
    if (data.data.d.burst && data.progress > 0.9) {
      setShowBurst(true);
    } else {
      setShowBurst(false);
      setWasBurstPlayed(false);
    }
  };

  // Create an array of 90 elements with the 45th element set to 'HT"
  const arr = Array(91)
    .fill()
    .map((_, i) => (i === 45 ? "HT" : i));

  const progressBar = arr.map((step) => {
    return step === "HT" ? (
      <div className="step" id="halftime" key="step-halftime">
        <p>HT</p>
      </div>
    ) : (
      <div
        key={step}
        className={step <= minutes ? "step active" : " step inactive"}
      />
    );
  });

  return (
    <div className="scroll-container">
      <div
        className="sticky-container"
        style={{
          backgroundImage: `${image}, linear-gradient(90deg, rgba(4,14,33,1) 0%, rgba(138,138,138,1) 25%, rgba(255,255,255,1) 100%)`,
        }}
      >
        <div className="progress-bar">{progressBar}</div>
        {showBurst && (
          <button className="burst-button" onClick={runBurst}>
            {wasBurstPlayed ? "Watch again" : "See burst"}
          </button>
        )}
      </div>
      <Scrollama
        offset={0.8}
        onStepEnter={onStepEnter}
        onStepProgress={onStepProgress}
        debug
      >
        {data.map((d, stepIndex) => {
          return (
            <Step data={{ d, stepIndex }} key={stepIndex}>
              <div className={`step-container ${d.textPosition}`}>
                <p className="step-heading">{d.heading}</p>
                <p>{d.text}</p>
              </div>
            </Step>
          );
        })}
      </Scrollama>
    </div>
  );
};

export default Scroller;
