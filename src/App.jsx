import "./styles/App.css";

import Scroller from "./components/Scroller";
import Hero from "./components/Hero";
import Navbar from "./components/Nav";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Scroller />
      </main>
    </>
  );
}

export default App;
