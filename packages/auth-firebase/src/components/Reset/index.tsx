import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../fireabse";

export const Reset = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<any>(null);
  const [reset, setReset] = React.useState(false)
  const history = useHistory()

  const procesarDatos = (e: any) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingrese email");
      return;
    }

    setError(null);

    recuperar();
  };

  const recuperar = React.useCallback(async () => {
    try {
      auth.sendPasswordResetEmail(email);
    //   setReset(true)
      history.push('/login')
    } catch (error: any) {
      console.log(error.message);
    }
  }, [email, history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">Reiniciar contraseña</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            {/* {reset && <div>Correo enviado</div>} */}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingresa email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="d-grid gap-2">
              <button className="btn btn-dark btn-sm py-2 my-2" type="submit">
                Reiniciar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
