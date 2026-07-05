import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = {
  todo: { title: 'To Do', id: 'todo' },
  in_progress: { title: 'In Progress', id: 'in_progress' },
  done: { title: 'Done', id: 'done' },
};

function TaskBoard({ tasks: propTasks = [], onUpdateTaskStatus }) {
  const tasks = Array.isArray(propTasks) ? propTasks : [];

  const normalizedStatus = (task) => String(task.status ?? '').trim().toLowerCase();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (typeof onUpdateTaskStatus === 'function') {
      onUpdateTaskStatus(draggableId, destination.droppableId);
    }
  };

  return (
    <div className="task-board">
      <h3>Task Board</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          {Object.values(columns).map((column) => {
            const columnTasks = tasks.filter((task) => normalizedStatus(task) === column.id);

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
                              {task.title || task.name || 'Untitled Task'}
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