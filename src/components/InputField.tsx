import React, { useRef, useState } from "react";
import "./styles.css";

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent, deadline: string, priority: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  handleAdd,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);

  const [deadline, setDeadline] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");

  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd(e, deadline, priority);
        setTodo("");
        setDeadline(""); // Clear deadline field
        setPriority("low"); // Reset priority to default
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        ref={deadlineRef}
        className="input__box"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        ref={priorityRef}
        className="input__box"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
