/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useTask } from "../hooks/useTask";
import TaskCard from "../components/TaskCard";

export default function TaskPage() {
  const { tasks, getTasks } = useTask();

  // console.log(tasks);

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return <h1>No hay tareas </h1>;
  }
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task._id}
            task={task}
          />
        );
      })}
    </div>
  );
}
