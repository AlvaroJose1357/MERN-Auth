import { useForm } from "react-hook-form";
import { useTask } from "../hooks/useTask";
import { useNavigate } from "react-router-dom";

export default function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask, error } = useTask();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await createTask(data);
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
