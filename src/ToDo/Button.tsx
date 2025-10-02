import type { SetStateAction } from "react";

interface Props {
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        text: string;
        done: boolean;
      }[]
    >
  >;
  tasks: {
    text: string;
    done: boolean;
  }[];
  newTask: string;
  setNewTask: React.Dispatch<SetStateAction<string>>;
}

export default function Button({
  setTasks,
  tasks,
  newTask,
  setNewTask,
}: Props) {
  return (
    <div>
      <button
        type="button"
        onClick={() => setTasks([])}
        style={{
          width: "70px",
          height: "24px",
          fontSize: "14px",
          borderRadius: "4px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center", // Center the text
          padding: 0, // Remove extra padding
          display: "inline-block", // Ensure proper centering
          marginRight: "10px",
        }}
      >
        {" "}
        Clear All
      </button>

      <button
        type="button"
        onClick={() =>
          setTasks(tasks.map((task) => ({ ...task, done: false })))
        }
        style={{
          width: "100px",
          height: "24px",
          fontSize: "14px",
          borderRadius: "4px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center", // Center the text
          padding: 0, // Remove extra padding
          display: "inline-block", // Ensure proper centering
          marginRight: "10px", // Add margin for spacing
        }}
      >
        {" "}
        Undo Check
      </button>

      <input
        className="led-input"
        value={newTask}
        placeholder="Enter a new task here..."
        onChange={(e) => setNewTask(e.target.value)}
        style={{
          borderRadius: "8px",
          padding: "6px 10px",
          outline: "none",
        }}
      />
      <button
        type="button"
        onClick={() => setTasks(tasks.map((task) => ({ ...task, done: true })))}
        style={{
          width: "130px",
          height: "24px",
          fontSize: "14px",
          borderRadius: "4px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center", // Center the text
          padding: 0, // Remove extra padding
          display: "inline-block", // Ensure proper centering
          marginLeft: "10px",
        }}
      >
        Mark all as done
      </button>
    </div>
  );
}
