import { useForm } from "react-hook-form";
import { useTask } from "../hooks/useTask";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask, error } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadTask();
  }, []);

  async function loadTask() {
    if (params.id) {
      const task = await getTask(params.id);
      console.log(task);
      setValue("title", task.title);
      setValue("description", task.description);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {error.map((error, index) => (
        <div
          key={index}
          className="bg-red-600 p-2 text-white my-4 font-bold">
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full bg-zinc-600 text-white px-4 py-2 my-2 rounded-md"
          autoFocus
        />

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-zinc-600 text-white px-4 py-2 my-2 rounded-md"></textarea>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
