import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  droppableId: string;
  title: string;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<Props> = ({ droppableId, title, todos, setTodos }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <span className="todos__heading">{title}</span>
          {todos.map((todo, index) => (
            <SingleTodo
              index={index}
              todos={todos}
              todo={todo}
              key={todo.id}
              setTodos={setTodos}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
