import { NavLink } from "react-router-dom";
import { useContextAuth } from "../../hook";

export const ProtectedRoute = (props: any) => {
  const { user, loading } = useContextAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <NavLink to={"/login"} />;

  return <>{props.children}</>;
};
