import "../styles/Hero.css";

function Hero() {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: "url('/hero.png')" }}
    >
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
      <p id="hero-scrolltext">Scroll to continue</p>
    </section>
  );
}

export default Hero;