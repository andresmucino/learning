import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actulizarUsuarioAccion,
  editarFotoAccion,
} from "../../redux";

export const Perfil = () => {
  const dispatch = useDispatch();

  const usuario = useSelector((store: any) => store.usuario.user);
  const loading = useSelector((store: any) => store.usuario.loading);

  const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName);
  const [activarFormulario, setActivarFormulario] = React.useState(false);
  const [error, setError] = React.useState(false);

  const actulizarUsuario = () => {
    if (!nombreUsuario.trim()) {
      console.log("nombre vacio");
      return;
    }
    
    dispatch(actulizarUsuarioAccion(nombreUsuario));
    setActivarFormulario(false);
  };

  const seleccionarArchivo = (e: any) => {
    const imageClient = e.target.files[0];

    if (imageClient === undefined) {
      console.log("no se selecciono imagen");
      return;
    }

    if (imageClient.type === "image/png" || imageClient.type === "image/jpg") {
      dispatch(editarFotoAccion(imageClient));
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="mt-5 text-center ">
      <div className="card">
        <div className="card-body">
          <img src={usuario.photoURL} alt="" width={"100px"} />
          <h5 className="card-title">Nombre: {usuario.displayName}</h5>
          <p className="card text">Email: {usuario.email}</p>
          <button
            className="btn btn-dark"
            onClick={() => setActivarFormulario(true)}
          >
            Editar nombre
          </button>
          {error && (
            <div className="alert alert-warning mt-3">
              Solo archivos PNG o JPG
            </div>
          )}
          <div className="input-group mb-3 justify-content-center">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              style={{ display: "none" }}
              onChange={(e) => seleccionarArchivo(e)}
              disabled={loading}
            />
            <label
              className={
                loading ? "btn btn-dark mt-2 disabled" : "btn btn-dark mt-2"
              }
              htmlFor="inputGroupFile02"
            >
              Upload
            </label>
          </div>
          {loading && (
            <div className="card-body">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {activarFormulario && (
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={nombreUsuario}
                      onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => actulizarUsuario()}
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
