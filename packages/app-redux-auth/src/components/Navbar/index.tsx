import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cerrarSesionAction } from "../../redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const active = useSelector((store: any) => store.usuario.activo);

  const cerrarSesion = () => {
    dispatch(cerrarSesionAction());
    navigate("/login");
  };

  return (
    <div className="navbar navbar-dark bg-dark ">
      <Link className="navbar-brand" to={"/"}>
        APP POKE
      </Link>
      <div className="flex">
        {active ? (
          <>
            <NavLink className={"btn btn-dark mr-2"} to={"/"}>
              Inicio
            </NavLink>
            <NavLink className={"btn btn-dark mr-2"} to={"/perfil"}>
              Perfil
            </NavLink>
            <button
              className={"btn btn-dark mr-2"}
              onClick={() => cerrarSesion()}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <NavLink className={"btn btn-dark mr-2"} to={"/login"}>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};
