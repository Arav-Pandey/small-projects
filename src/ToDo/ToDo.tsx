import { useState } from "react";
import useRouteHomePage from "../useRouteHomepage";
import Panel from "../HomePage/Panel";
import Button from "./Button";

export default function ToDo() {
  const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useRouteHomePage();

  // Example tasks
  const exampleTasks = [
    { text: "Example task #1", done: false },
    { text: "Example task #2", done: false },
  ];

  const displayTasks = tasks.length === 0 ? exampleTasks : tasks;

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Panel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
      <h1>To-Do list</h1>
      <h3>
        Add any item you would like to your list and I will keep track of it.
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (newTask.trim() === "") return; // optional: ignore empty tasks
            setTasks([...tasks, { text: newTask, done: false }]);
            setNewTask(""); // Clear the input after adding the task
          }}
        >
          <Button
            tasks={tasks}
            setTasks={setTasks}
            newTask={newTask}
            setNewTask={setNewTask}
          />
        </form>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        {displayTasks.map((task, index) => (
          <div key={index}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                name={task.text}
                checked={task.done}
                disabled={tasks.length === 0} // Disable for example tasks
                onChange={() => {
                  if (tasks.length === 0) return; // Prevent toggling example tasks
                  setTasks(
                    tasks.map((t, i) =>
                      i === index ? { ...t, done: !t.done } : t
                    )
                  );
                }}
              />
              <span style={{ margin: "0 8px" }}>{task.text}</span>
              <button
                type="button"
                onClick={() => {
                  setTasks(tasks.filter((_, i) => i !== index));
                }}
                style={{
                  width: "12px",
                  height: "12px",
                  fontSize: "10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center", // Center the text
                  padding: 0, // Remove extra padding
                  display: "flex", // Ensure proper centering
                }}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
