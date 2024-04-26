import "../styles/Hero.css";

import ScrollIcon from "./ScrollIcon";

function Hero() {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
      <a href="https://www.thetimes.co.uk">
        <img src="/times-masthead.png" />
      </a>
      <div className="hero-container">
        <h1 id="hero-header">
          <span id="hero-firstname">Jack</span>
          <span id="hero-lastname">Grealish</span>
          <span id="hero-header--highlight">in pictures</span>
        </h1>
        <p id="hero-subhead">
          Live every moment through the lens of Marc Aspland, Chief Sports
          photographer
        </p>
      </div>
      <div id="hero-scrollcontainer">
        <p id="hero-scrollcontainer--text">Scroll to continue</p>
        <ScrollIcon />
      </div>
    </section>
  );
}

export default Hero;
