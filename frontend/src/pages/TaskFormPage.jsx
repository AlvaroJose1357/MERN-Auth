import { useForm } from "react-hook-form";
import { useTask } from "../hooks/useTask";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

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
      setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (params.id) {
      await updateTask(params.id, formattedData);
    } else {
      await createTask(formattedData);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {error.map((error, index) => (
          <div
            key={index}
            className="bg-red-600 p-2 text-white my-4 font-bold">
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full bg-zinc-600 text-white px-4 py-2 my-2 rounded-md"
            autoFocus
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-600 text-white px-4 py-2 my-2 rounded-md"></textarea>

          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className="w-full bg-zinc-600 text-white px-4 py-2 my-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full cursor-pointer bg-zinc-500 p-3 font-bold uppercase text-white transition-colors hover:bg-zinc-700 mt-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
