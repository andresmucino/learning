import { useContextChat } from "../../context";

export const Navbar = () => {
  const { ingresarUsuario, cerrarSesion } = useContextChat();
  return (
    <div className="navbar navbar-dark bg-dark p-2">
      <span className="navbar-brand">Chat</span>
      <div className="p-2">
        <button className="btn btn-outline-danger my-2 me-2" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
        <button
          className="btn btn-outline-success my-2"
          onClick={ingresarUsuario}
        >
          Acceder
        </button>
      </div>
    </div>
  );
};
