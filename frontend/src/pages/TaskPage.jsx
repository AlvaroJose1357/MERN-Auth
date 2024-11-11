/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTask } from "../hooks/useTask";

export default function TaskPage() {
  const { tasks, getTasks } = useTask();

  console.log(tasks);

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return <h1>No hay tareas </h1>;
  }
  return (
    <div>
      {tasks.map((task) => {
        return (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        );
      })}
    </div>
  );
}
