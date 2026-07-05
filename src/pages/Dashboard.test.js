import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('shows project overview and task board sections', () => {
    const projects = [{ id: 'p1', name: 'Website', status: 'active' }];
    const tasks = [
      { id: 't1', title: 'Design homepage', project_id: 'p1', status: 'todo' },
      { id: 't2', title: 'Ship release', project_id: 'p1', status: 'done' },
    ];

    render(
      <Dashboard
        projects={projects}
        tasks={tasks}
        onAddTask={() => {}}
        onUpdateTaskStatus={() => {}}
        onDeleteTask={() => {}}
      />
    );

    expect(screen.getByText(/project overview/i)).toBeInTheDocument();
    expect(screen.getByText(/task board/i)).toBeInTheDocument();
  });
});
