import React, { useState } from 'react';
import TaskBoard from '../components/TaskBoard';

function Dashboard({ projects, tasks, onAddTask, onUpdateTaskStatus, onDeleteTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !selectedProjectId) return;
    onAddTask(taskTitle, selectedProjectId);
    setTaskTitle('');
  };

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  const getProjectName = (projId) => {
    const proj = projects.find((p) => p.id === projId);
    return proj ? proj.name : 'Unknown Project';
  };

  return (
    <div>
      <header className="main-header">
        <h2>Zenris Dashboard and Task Board</h2>
      </header>

      <div className="dashboard-overview">
        <div className="project-card dashboard-overview-card">
          <h3>Project Overview</h3>
          <p className="dashboard-overview-text">You are managing {projects.length} project(s) and {tasks.length} task(s).</p>
          <div className="dashboard-overview-stats">
            <div className="dashboard-stat">
              <strong>{projects.length}</strong>
              <span>Projects</span>
            </div>
            <div className="dashboard-stat">
              <strong>{todoTasks.length}</strong>
              <span>To Do</span>
            </div>
            <div className="dashboard-stat">
              <strong>{inProgressTasks.length}</strong>
              <span>In Progress</span>
            </div>
            <div className="dashboard-stat">
              <strong>{doneTasks.length}</strong>
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>

      <div className="project-card dashboard-add-task-card">
        <h3>Quick Add Task</h3>
        <form className="dashboard-form" onSubmit={handleCreateTask}>
          <input
            type="text"
            className="login-input dashboard-form-input"
            placeholder="What needs to be done?"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
          <select
            className="login-input dashboard-form-select"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            required
          >
            <option value="">-- Select Project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button type="submit" className="login-button dashboard-form-submit">
            Add Task
          </button>
        </form>
      </div>

      <TaskBoard tasks={tasks} onUpdateTaskStatus={onUpdateTaskStatus} />

      <div className="dashboard-board">
        <div className="dashboard-column dashboard-column--todo">
          <h4 className="dashboard-column-title">To Do ({todoTasks.length})</h4>
          {todoTasks.map((t) => (
            <TaskCard key={t.id} task={t} getProjectName={getProjectName} onUpdate={onUpdateTaskStatus} onDelete={onDeleteTask} />
          ))}
        </div>

        <div className="dashboard-column dashboard-column--in-progress">
          <h4 className="dashboard-column-title">In Progress ({inProgressTasks.length})</h4>
          {inProgressTasks.map((t) => (
            <TaskCard key={t.id} task={t} getProjectName={getProjectName} onUpdate={onUpdateTaskStatus} onDelete={onDeleteTask} />
          ))}
        </div>

        <div className="dashboard-column dashboard-column--done">
          <h4 className="dashboard-column-title">Done ({doneTasks.length})</h4>
          {doneTasks.map((t) => (
            <TaskCard key={t.id} task={t} getProjectName={getProjectName} onUpdate={onUpdateTaskStatus} onDelete={onDeleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, getProjectName, onUpdate, onDelete }) {
  return (
    <div className="project-card task-card">
      <h5 className="task-title">{task.title}</h5>
      <span className="task-project-badge">{getProjectName(task.project_id)}</span>

      <div className="task-actions">
        <div className="task-action-group">
          {task.status !== 'todo' && (
            <button className="task-action-button" onClick={() => onUpdate(task.id, 'todo')}>
              To Do
            </button>
          )}
          {task.status !== 'in_progress' && (
            <button className="task-action-button" onClick={() => onUpdate(task.id, 'in_progress')}>
              Work
            </button>
          )}
          {task.status !== 'done' && (
            <button className="task-action-button" onClick={() => onUpdate(task.id, 'done')}>
              Done
            </button>
          )}
        </div>

        <button className="task-delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Dashboard;