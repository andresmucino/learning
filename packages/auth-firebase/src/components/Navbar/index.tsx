import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { auth } from "../../fireabse";

interface NavbarProps {
  firebaseUser: any;
}

export const Navbar: React.FC<NavbarProps> = ({ firebaseUser }) => {
  const history = useHistory();
  const cerrarSesion = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };
  return (
    <div className="navbar nabvar-dark bg-dark">
      <Link className="navbar-brand px-4" to={"/"}>
        Auth
      </Link>
      <div>
        <div className="d-flex">
          <NavLink to={"/"} exact className="btn btn-dark mr-2">
            Inicio
          </NavLink>
          {firebaseUser !== null ? (
            <NavLink to={"/admin"} exact className="btn btn-dark mr-2">
              Admin
            </NavLink>
          ) : null}

          {firebaseUser !== null ? (
            <button className="btn btn-dark" onClick={() => cerrarSesion()}>
              Cerrar sesión
            </button>
          ) : (
            <NavLink to={"/login"} exact className="btn btn-dark mr-2">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
