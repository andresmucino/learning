import moment from "moment";
import React from "react";
import { db } from "../../fireabse";

interface FirestoreProps {
  user: any;
}

export const Firestore: React.FC<FirestoreProps> = ({ user }) => {
  const [tareas, setTareas] = React.useState<any>([]);
  const [tarea, setTarea] = React.useState("");
  const [editar, setEditar] = React.useState(false);
  const [id, setId] = React.useState("");
  const [ultimo, setUltimo] = React.useState<any>(null);
  const [desactivar, setDesactivar] = React.useState(false);

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        setDesactivar(true);

        const data = await db
          .collection(user.uid)
          .limit(2)
          .orderBy("fecha", "desc")
          .get();

        const arrayData = await data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUltimo(data.docs[data.docs.length - 1]);

        setTareas(arrayData);

        const query = await db
          .collection(user.uid)
          .limit(10)
          .orderBy("fecha", "desc")
          .startAfter(data.docs[data.docs.length - 1])
          .get();

        if (query.empty) {
          console.log("no hay mas documentos");
          setDesactivar(true);
        } else {
          setDesactivar(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, []);

  const agregar = async (e: any) => {
    e.preventDefault();
    console.log(tarea);
    if (!tarea.trim()) {
      console.log("esta vacio");
      return;
    }
    try {
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now(),
      };

      const data = await db.collection(user.uid).add(nuevaTarea);

      setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
      setTarea("");
    } catch (error) {
      console.log(error);
    }
  };

  const siguiente = async () => {
    console.log("siguiente");
    try {
      const data = await db
        .collection(user.uid)
        .limit(2)
        .orderBy("fecha", "desc")
        .startAfter(ultimo)
        .get();

      const arrayData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTareas([...tareas, ...arrayData]);

      setUltimo(data.docs[data.docs.length - 1]);

      const query = await db
      .collection(user.uid)
      .limit(10)
      .orderBy("fecha", "desc")
      .startAfter(data.docs[data.docs.length - 1])
      .get();

    if (query.empty) {
      console.log("no hay mas documentos");
      setDesactivar(true);
    } else {
      setDesactivar(false);
    }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id: any) => {
    try {
      await db.collection(user.uid).doc(id).delete();

      const arrayFilter = tareas.filter((item: any) => item.id !== id);

      setTareas(arrayFilter);
    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = (item: any) => {
    setEditar(true);
    setTarea(item.name);
    setId(item.id);
  };

  const edit = async (e: any) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("vacio");
      return;
    }

    try {
      await db.collection(user.uid).doc(id).update({ name: tarea });

      const arrayEditado = tareas.map((item: any) =>
        item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
      );

      setTareas(arrayEditado);

      setEditar(false);
      setTarea("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tareas.map((item: any) => (
              <li className="list-group-item" key={item.id}>
                {item.name} - {moment(item.fecha).format("LLL")}
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => editarTarea(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-info btn-block mt-2"
            onClick={() => siguiente()}
            disabled={desactivar}
          >
            Siguiente...
          </button>
        </div>
        <div className="col-md-6">
          <h3>{editar ? "Editar tarea" : "Agregar tarea"}</h3>
          <form onSubmit={editar ? edit : agregar}>
            <input
              type="text"
              name="tarea"
              className="form-control mb-2"
              placeholder="Ingresa tarea"
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              id=""
            />
            <button
              className={
                editar ? "btn btn-warning btn-block" : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editar ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
