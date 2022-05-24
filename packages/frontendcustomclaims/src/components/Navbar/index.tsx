import { useContextUser } from "../../hooks";

export const Navbar = () => {
  const { cerrarSesion, iniciarSesion, usuario } = useContextUser();

  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container">
        <div>
          {usuario.email ? (
            <button className="btn btn-dark" onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
          ) : (
            <button className="btn btn-dark" onClick={iniciarSesion}>
              Login
            </button>
          )}
        </div>
        <div>
          <span className="text-light">
            {usuario.email ? usuario.email : "invitado"}
          </span>
        </div>
      </div>
    </div>
  );
};
