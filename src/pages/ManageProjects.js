import React, { useState } from 'react';

function ManageProjects({ projects, onAddProject, onDeleteProject }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddProject({ name, description, status });
    setName('');
    setDescription('');
    setStatus('active');
  };

  return (
    <div>
      <header className="main-header">
        <h2>Project Management</h2>
      </header>

      <div className="project-card">
        <h3>Add New Project</h3>
        <form className="page-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Project Name:</label>
            <input
              type="text"
              className="login-input"
              placeholder="e.g., Mobile App"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label">Description:</label>
            <textarea
              className="login-input field-textarea"
              placeholder="Project details..."
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label">Status:</label>
            <select
              className="login-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="login-button dashboard-form-submit">
            Save Project
          </button>
        </form>
      </div>

      <div className="project-card project-list-section">
        <h3>Existing Projects</h3>
        <ul className="project-list">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} className="project-list-item">
                <div className="project-list-content">
                  <strong>{project.name}</strong> <span className="project-status-badge">{project.status}</span>
                  <p className="text-muted project-list-text">{project.description}</p>
                </div>
                <button className="project-delete-button" onClick={() => onDeleteProject(project.id)}>
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-muted">No projects found. Add your first project above.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ManageProjects;