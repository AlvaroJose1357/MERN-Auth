/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuth, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/tasks");
    }
  }, [isAuth]);

  const registerTask = (data) => {
    signup(data);
  };

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">Register</h1>
      {error.map((error, index) => (
        <div
          key={index}
          className="bg-red-600 p-2 text-white my-4 font-bold">
          {error}
        </div>
      ))}
      <form onSubmit={handleSubmit(registerTask)}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="text-sm font-bold uppercase pb-6">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md border border-gray-500 my-2"
            placeholder="Username"
            {...register("username", {
              required: "El username es obligatorio",
            })}
          />
          {errors.username && (
            <Error>{errors.username.message?.toString()}</Error>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="text-sm font-bold uppercase">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md border border-gray-500 my-2"
            placeholder="Email"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "El Email no es válido",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message?.toString()}</Error>}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="text-sm font-bold uppercase">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md border border-gray-500 my-2"
            placeholder="Password"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <Error>{errors.password.message?.toString()}</Error>
          )}
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-zinc-500 p-3 font-bold uppercase text-white transition-colors hover:bg-zinc-700">
          Register
        </button>
      </form>
    </div>
  );
}
