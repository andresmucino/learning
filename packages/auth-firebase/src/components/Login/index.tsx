import React from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../fireabse";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState<any>(null);
  const [registro, setRegistro] = React.useState(true);
  const history = useHistory();

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);

      await db
        .collection("usuarios")
        .doc(res.user?.uid)
        .set({ email: res.user?.email, uid: res.user?.uid });

      //@ts-ignore
      await db.collection(res.user.uid).add({
        name: "tarea de ejemplo",
        fecha: Date.now(),
      });

      setEmail("");
      setPass("");
      setError(null);
      history.push("/admin");
    } catch (error: any) {
      setError(error.message);
      if (error.code === "auth/invalid-email") {
        setError("Email invalido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya existente");
      }
    }
  }, [email, pass, history]);

  const loginUser = React.useCallback(async () => {
    try {
      await auth.signInWithEmailAndPassword(email, pass);
      setEmail("");
      setPass("");
      setError(null);
      history.push("/admin");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("Usuario no registrado");
      }
      if (error.code === "auth/invalid-email") {
        setError("Usuario invalido");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, pass, history]);

  const procesarDatos = (e: any) => {
    e.preventDefault();
    if (!email.trim() || !pass.trim()) {
      setError("Ingrese email");
      return;
    }
    if (!pass.trim()) {
      setError("Ingrese Contraseña");
      return;
    }
    if (pass.length < 6) {
      setError("Contraseña debe ser mayor a 6 caracteres");
      return;
    }

    setError(null);

    if (registro) {
      registrar();
    } else {
      loginUser();
    }
  };

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {registro ? "Registrar usuario" : "Login de acceso"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingresa email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingresa password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <div className="d-grid gap-2">
              <button className="btn btn-dark btn-sm py-2 my-2">
                {registro ? "Registrarse" : "Acceder"}
              </button>
              <button
                className="btn btn-info btn-sm py-2"
                onClick={() => setRegistro(!registro)}
              >
                {registro ? "¿Ya estas registrado?" : "¿No tienes cuenta?"}
              </button>
              {!registro ? (
                <button
                  className="btn btn-lg btn-dark btn-block btm-sm mt-2"
                  type="button"
                  onClick={() => history.push("/reset")}
                >
                  Reacuperar contraseña
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
