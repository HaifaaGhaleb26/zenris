import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialTasks = [
  { id: 'task-1', title: 'Design Initial Wireframes', status: 'todo' },
  { id: 'task-2', title: 'Code Reusable Components', status: 'in_progress' },
  { id: 'task-3', title: 'Connect Database to Supabase', status: 'done' },
];

const columns = {
  todo: { title: 'To Do', id: 'todo' },
  in_progress: { title: 'In Progress', id: 'in_progress' },
  done: { title: 'Done', id: 'done' },
};

function TaskBoard({ tasks: propTasks, onUpdateTaskStatus }) {
  const [localTasks, setLocalTasks] = useState(initialTasks);

  const tasks = Array.isArray(propTasks) && propTasks.length ? propTasks : localTasks;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // If parent provided an update handler, use it (keeps global state in sync)
    if (typeof onUpdateTaskStatus === 'function') {
      onUpdateTaskStatus(draggableId, destination.droppableId);
      return;
    }

    // Fallback to local state update
    const updatedTasks = tasks.map((task) => {
      if (String(task.id) === String(draggableId)) {
        return { ...task, status: destination.droppableId };
      }
      return task;
    });

    setLocalTasks(updatedTasks);
  };

  return (
    <div className="task-board">
      <h3>Task Board</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          {Object.values(columns).map((column) => {
            const columnTasks = tasks.filter((task) => task.status === column.id);

            return (
              <div key={column.id} className="board-column">
                <h4>{column.title}</h4>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="task-board-dropzone">
                      {columnTasks.map((task, index) => (
                        <Draggable key={String(task.id)} draggableId={String(task.id)} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-item"
                            >
                              {task.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskBoard;