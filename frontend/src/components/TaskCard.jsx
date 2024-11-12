/* eslint-disable react/prop-types */
import { useTask } from "../hooks/useTask";
import { Link } from "react-router-dom";
export default function TaskCard({ task }) {
  const { deleteTask } = useTask();

  const handleDelete = async () => {
    await deleteTask(task._id);
  };

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md m-4">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/tasks/${task._id}`}>Edit</Link>
        </div>
      </header>
      <p className="text-slate-400">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  );
}
