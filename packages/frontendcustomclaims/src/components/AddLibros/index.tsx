import { useState } from "react";
import { db } from "../../firebase";
import { useContextLibros, useContextUser } from "../../hooks";

export const AgregarLibros = () => {
  const [titulo, setTitulo] = useState("");
  const [paginas, setPaginas] = useState("");

  const { usuario } = useContextUser();
  const { fetchLibros } = useContextLibros();

  const agregarLibros = (e: any) => {
    e.preventDefault();
    if (!titulo.trim() || !paginas.trim()) {
      console.log("campos vacios");
    }

    db.collection("libros")
      .add({
        titulo: titulo,
        paginas: paginas,
        uid: usuario.uid,
        autor: db.collection("usuarios").doc(usuario.email),
      })
      .then((doc) => {
        console.log(doc);
        fetchLibros();
      })
      .catch((error) => {
        console.log(error);
      });

    setTitulo("");
    setPaginas("");
  };

  return (
    <div>
      <form onSubmit={agregarLibros}>
          <h3 className="mt-5">Agregar Libros</h3>
        <input
          type="text"
          className="form-control mb-2 mt-2"
          placeholder="Ingresa libro"
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Ingresa paginas"
          onChange={(e) => setPaginas(e.target.value)}
          value={paginas}
        />
        <button className="btn btn-primary" type="submit">
          Agregar
        </button>
      </form>
    </div>
  );
};
