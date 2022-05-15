import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerPokemones,
  anteriorPokemones,
  siguientePokemonesAction,
  detallePokemonAction,
} from "../../redux";
import { Detalle } from "../detalle";

export const Pokemones = () => {
  const dispatch = useDispatch();

  const pokemones = useSelector((store: any) => store.pokemones.results);
  const next = useSelector((store: any) => store.pokemones.next);
  const previous = useSelector((store: any) => store.pokemones.previous);

  React.useEffect(() => {
    const fetchData = () => {
      //@ts-ignore
      dispatch(obtenerPokemones());
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-6">
        <h3>Pokemones</h3>
        <br />
        <div className="d-flex justify-content-between">
          {pokemones.length === 0 && (
            <button
              //@ts-ignore
              onClick={() => dispatch(obtenerPokemones())}
              className="btn btn-dark"
            >
              Get pokemones
            </button>
          )}
          {previous && (
            <button
              //@ts-ignore
              onClick={() => dispatch(anteriorPokemones())}
              className="btn btn-dark"
            >
              Anterior
            </button>
          )}
          {next && (
            <button
              //@ts-ignore
              onClick={() => dispatch(siguientePokemonesAction())}
              className="btn btn-dark"
            >
              Siguiente
            </button>
          )}
        </div>
        <br />
        <ul className="list-group">
          {pokemones.map((item: any) => (
            <li key={item.name} className="list-group-item">
              {item.name}
              <button
                className="btn btn-dark btn-sm float-end"
                //@ts-ignore
                onClick={() => dispatch(detallePokemonAction(item.url))}
              >
                Info
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        <h3>Detalle pokemon</h3>
        <Detalle />
      </div>
    </div>
  );
};
