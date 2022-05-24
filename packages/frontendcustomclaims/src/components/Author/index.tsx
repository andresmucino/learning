import React from "react";
import { db } from "../../firebase";
import { useContextLibros, useContextUser } from "../../hooks";

export const PintarAutor = (props: any) => {
  const [autorData, setAutorData] = React.useState<any>([]);

  React.useEffect(() => {
    fetchAutor();
  }, []);

  const { fetchLibros } = useContextLibros();
  const { usuario } = useContextUser();

  const fetchAutor = async () => {
    try {
      const res = await props.autor.get();
      console.log(res.data());
      setAutorData(res.data());
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarLibro = async () => {
    try {
      await db.collection("libros").doc(props.uid).delete();
      fetchLibros();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <span> - {autorData.email}</span>
      {(autorData.email === usuario.email || usuario.rol === 'admin')&& (
        <button className="btn btn-danger float-end" onClick={eliminarLibro}>
          Eliminar
        </button>
      )}
    </>
  );
};
