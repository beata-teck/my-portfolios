export default function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <h1>Hi, I’m [Your Name]</h1>
        <h2>A Passionate [Your Role: e.g., Frontend Developer]</h2>
        <p>
          I love building clean, user-friendly web applications with React,
          JavaScript, and modern web technologies. Explore my projects and get
          to know more about me!
        </p>
        <div className="hero-buttons">
          <a href="/projects" className="btn">View Projects</a>
          <a href="/contact" className="btn btn-outline">Contact Me</a>
        </div>
      </div>
    </section>
  );
}