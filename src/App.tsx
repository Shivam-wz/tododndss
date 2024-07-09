// src/App.tsx
import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import Dashboard from "./components/Dashboard";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";
import { useNavigate } from "react-router-dom";


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [ongoingTodos, setOngoingTodos] = useState<Array<Todo>>([]);
  const [pendingTodos, setPendingTodos] = useState<Array<Todo>>([]);
  const navigate = useNavigate();

  const handleAdd = (
    e: React.FormEvent,
    deadline: string,
    priority: string
  ) => {
    e.preventDefault();

    if (todo) {
      const newTodo: Todo = {
        id: Date.now(),
        todo,
        isDone: false,
        deadline,
        priority: priority as "low" | "medium" | "high",
      };

      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let active = [...todos];
    let complete = [...completedTodos];
    let ongoing = [...ongoingTodos];
    let pending = [...pendingTodos];
    let add: Todo | undefined;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "CompletedTodos") {
      add = complete[source.index];
      complete.splice(source.index, 1);
    } else if (source.droppableId === "OngoingTodos") {
      add = ongoing[source.index];
      ongoing.splice(source.index, 1);
    } else if (source.droppableId === "PendingTodos") {
      add = pending[source.index];
      pending.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      if (add) active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "CompletedTodos") {
      if (add) complete.splice(destination.index, 0, add);
    } else if (destination.droppableId === "OngoingTodos") {
      if (add) ongoing.splice(destination.index, 0, add);
    } else if (destination.droppableId === "PendingTodos") {
      if (add) pending.splice(destination.index, 0, add);
    }

    setTodos(active);
    setCompletedTodos(complete);
    setOngoingTodos(ongoing);
    setPendingTodos(pending);
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/signin");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
       
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <Dashboard
          totalTasks={
            todos.length +
            ongoingTodos.length +
            pendingTodos.length +
            completedTodos.length
          }
          completedTasks={completedTodos.length}
        />
        <div className="container">
          <TodoList
            droppableId="TodosList"
            title="Backlog"
            todos={todos}
            setTodos={setTodos}
          />
          <TodoList
            droppableId="OngoingTodos"
            title="To Do"
            todos={ongoingTodos}
            setTodos={setOngoingTodos}
          />
          <TodoList
            droppableId="PendingTodos"
            title="OnGoing"
            todos={pendingTodos}
            setTodos={setPendingTodos}
          />
          <TodoList
            droppableId="CompletedTodos"
            title="Done"
            todos={completedTodos}
            setTodos={setCompletedTodos}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
