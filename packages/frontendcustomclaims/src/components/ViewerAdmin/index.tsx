import React from "react";
import { db, functions } from "../../firebase";

export const ViewerAdmin = () => {
  const [usuarios, setUsuarios] = React.useState<any>([]);

  React.useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await db.collection("usuarios").get();
      const result = res.docs.map((doc) => doc.data());

      setUsuarios(result);
    } catch (error) {
      console.log(error);
    }
  };

  const administrador = (email: any) => {
    if (!email.trim()) {
      return console.log("email vacio");
    }

    const agregarRol = functions.httpsCallable("agregarAdministrador");

    agregarRol({ email: email }).then((res) => {
      console.log(res);
      if (res.data.error) {
        console.log("no tiene permisos");
        return;
      }

      db.collection("usuarios")
        .doc(email)
        .update({ rol: "admin" })
        .then((user) => {
          console.log("usuario modificado rol administrador");
          fetchUsuarios();
        });
    });
  };

  const crearAutor = (email: any) => {
    const crearAutor = functions.httpsCallable("crearAutor");

    crearAutor({ email: email }).then((res) => {
      console.log(res);
      if (res.data.error) {
        console.log("no tiene permisos");
        return;
      }
      db.collection("usuarios")
        .doc(email)
        .update({ rol: "autor" })
        .then((user) => {
          console.log("usuario modificado rol autor");
          fetchUsuarios();
        });
    });
  };

  const eliminarAutor = (email: any) => {
    const agregarRol = functions.httpsCallable("eliminarAutor");

    agregarRol({ email: email }).then((res) => {
      console.log(res);
      if (res.data.error) {
        console.log("no tiene permissos");
      }
      db.collection("usuarios")
        .doc(email)
        .update({ rol: "invitado" })
        .then((user) => {
          console.log("usuario modificado rol invitado");
          fetchUsuarios();
        });
    });
  };

  const eliminarAdministrador = (email: any) => {
    const agregarRol = functions.httpsCallable("eliminarAutor");

    agregarRol({ email: email }).then((res) => {
      console.log(res);
      if (res.data.error) {
        console.log("no tiene permissos");
      }
      db.collection("usuarios")
        .doc(email)
        .update({ rol: "invitado" })
        .then((user) => {
          console.log("usuario modificado rol invitado");
          fetchUsuarios();
        });
    });
  };

  return (
    <div>
      <h1>Administrador de usuarios</h1>
      {usuarios.map((item: any) => (
        <div key={item.uid} className="mb-3">
          {item.email} - rol: {item.rol}
          {item.rol === "admin" ? (
            <button
              className="btn btn-danger mx-2 "
              onClick={() => eliminarAdministrador(item.email)}
            >
              eliminar administrador
            </button>
          ) : (
            <>
              <button
                className="btn btn-warning mx-2"
                onClick={() => administrador(item.email)}
              >
                Administrador
              </button>
              <button
                className="btn btn-success mx-2 "
                onClick={() => crearAutor(item.email)}
              >
                Autor
              </button>
              <button
                className="btn btn-info mx-2 "
                onClick={() => eliminarAutor(item.email)}
              >
                Invitado
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
