import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuth, user, logout } = useAuth();

  console.log(user);

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10">
      <Link to={isAuth ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>

      <ul className="flex gap-x-3">
        {isAuth ? (
          <>
            <li>
              Welcome{" "}
              <Link
                to="/profile"
                className="text-white">
                {user?.username}
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="text-white">
                Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/add-task"
                className="text-white bg-indigo-500 px-4 py-1 rounded-3xl">
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="text-white">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-white bg-indigo-500 px-4 py-1 rounded-3xl">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/Register"
                className="text-white bg-indigo-500 px-4 py-1 rounded-3xl">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
