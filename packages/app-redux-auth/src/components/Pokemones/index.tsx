import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  anteriorPokemonAccion,
  detallePokemonAction,
  obtenerPokemonesAccion,
  siguientePokemonAction,
} from "../../redux";
import { DetallePokemon } from "../Details";

export const Pokemones = () => {
  const dispatch = useDispatch();

  const pokemones = useSelector((store: any) => store.pokemones.results);
  const next = useSelector((store: any) => store.pokemones.next);
  const previous = useSelector((store: any) => store.pokemones.previous);

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(obtenerPokemonesAccion());
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="row mt-3">
      <div className="col-md-6">
        <h3>Pokemones</h3>
        <br />
        <ul className="list-group mt-4">
          {pokemones.map((item: any) => (
            <li key={item.name} className="list-group-item">
              {item.name}
              <button
                className="btn btn-dark btm-sm float-end"
                onClick={() => dispatch(detallePokemonAction(item.url))}
              >
                Info
              </button>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between mt-2">
          {pokemones.length === 0 && (
            <button
              onClick={() => dispatch(obtenerPokemonesAccion())}
              className="btn btn-dark"
            >
              Get pokemones
            </button>
          )}
          {previous && (
            <button
              onClick={() => dispatch(anteriorPokemonAccion())}
              className="btn btn-dark"
            >
              Anterior
            </button>
          )}
          {next && (
            <button
              onClick={() => dispatch(siguientePokemonAction())}
              className="btn btn-dark"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <h3>Detalle pokemon</h3>
        <DetallePokemon />
      </div>
    </div>
  );
};
