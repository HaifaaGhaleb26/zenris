import React from 'react';

function ProjectList({ projects }) {
  return (
    <div className="project-card">
      <h3>Current Projects:</h3>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-list-item">
            <div className="project-list-content">
              <strong>{project.name}</strong> - {project.description}
            </div>
            <span className="project-status-badge">{project.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;