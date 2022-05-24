import { useContextLibros } from "../../hooks";
import { PintarAutor } from "../Author";

export const Libros = () => {
  const { libros } = useContextLibros();
  return (
    <div className="mt-5">
      <ul className="list-group">
        <h1>Lista de libros</h1>
        {libros.map((libro) => (
          <li className="list-group-item" key={libro.id}>
            <span>{libro.titulo}</span>
            <PintarAutor uid={libro.uid} autor={libro.autor} />
          </li>
        ))}
      </ul>
    </div>
  );
};
