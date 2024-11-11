import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function ProtectedRoute() {
  const { loading, isAuth } = useAuth();
  if (loading) {
    return <h1>Cargando...</h1>;
  }
  if (!isAuth) {
    // replace es para que no se pueda volver a la página anterior
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  return <Outlet />;
}
