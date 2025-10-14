import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <h1>Hi, I’m Beata</h1>
        <h2>A Passionate  Frontend Developer</h2>
        <p>
          I love building clean, user-friendly web applications with React,
          JavaScript, and modern web technologies. Explore my projects and get
          to know more about me!
        </p>
        <div className="hero-buttons">
          <Link to="/projects" className="btn">View Projects</Link>
          <Link to="/contact" className="btn btn-outline">Contact Me</Link>
        </div>
      </div>
    </section>
  );
}