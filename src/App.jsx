import "./styles/App.css";

import Scroller from "./components/Scroller";
import Hero from "./components/Hero";

function App() {
  // Generate an array of coordinates between random numbers to mimic a touch map
  const halftimeTouchCoordinates = Array.from(Array(30).keys()).map((d) => {
    return {
      id: d,
      x: Math.floor(Math.random() * 90) + 1,
      y: Math.floor(Math.random() * 70 + 1),
    };
  });

  const fulltimeTouchCoordinates = Array.from(Array(60).keys()).map((d) => {
    return {
      id: d,
      x: Math.floor(Math.random() * 90 + 1),
      y: Math.floor(Math.random() * 70 + 1),
    };
  });

  return (
    <main>
      <Hero />
      <Scroller
        halftimeTouchCoordinates={halftimeTouchCoordinates}
        fulltimeTouchCoordinates={fulltimeTouchCoordinates}
      />
      <div style={{ backgroundColor: "tomato", height: "100svh" }}>
        Scroller ends here
      </div>
    </main>
  );
}

export default App;
