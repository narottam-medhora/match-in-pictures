import "./styles/App.css";

import FirstHalf from "./components/FirstHalf";
import Hero from "./components/Hero";
import Halftime from "./components/Halftime";

const NUMBER_OF_TOUCHES = 50;

function App() {
  // Generate an array of coordinates between random numbers to mimic a touch map
  const touchCoordinates = Array.from(Array(NUMBER_OF_TOUCHES).keys()).map(
    (d) => {
      return {
        id: d,
        x: Math.floor(Math.random() * 90) + 1,
        y: Math.floor(Math.random() * 70 + 1),
      };
    }
  );

  return (
    <main>
      <Hero />
      <FirstHalf />
      <Halftime touchCoordinates={touchCoordinates} />
    </main>
  );
}

export default App;
