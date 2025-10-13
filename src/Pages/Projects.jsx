import { projects } from "../data";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section className="projects-page">
      <h1>My Projects</h1>
      <p>Here are some of the projects I’ve worked on recently:</p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}