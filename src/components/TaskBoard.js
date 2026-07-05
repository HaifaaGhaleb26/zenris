import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialTasks = [
  { id: 'task-1', content: 'Design Initial Wireframes', status: 'todo' },
  { id: 'task-2', content: 'Code Reusable Components', status: 'inProgress' },
  { id: 'task-3', content: 'Connect Database to Supabase', status: 'done' },
];

const columns = {
  todo: { title: 'To Do', id: 'todo' },
  inProgress: { title: 'In Progress', id: 'inProgress' },
  done: { title: 'Done', id: 'done' },
};

function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === draggableId) {
        return { ...task, status: destination.droppableId };
      }
      return task;
    });

    setTasks(updatedTasks);
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
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-item"
                            >
                              {task.content}
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