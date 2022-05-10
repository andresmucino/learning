import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { detallePokemonAction } from "../../redux";

export const DetallePokemon = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(detallePokemonAction());
    };
    fetchData();
  }, [dispatch]);

  const pokemon = useSelector((store: any) => store.pokemones.pokemon);

  return pokemon ? (
    <div className="card mt-4 text-center">
      <div className="card-body">
        <img src={pokemon.foto} className="img-fluid" />
        <div className="card-title text-uppercase">{pokemon.nombre}</div>
        <p className="card-text">
          Alto: {pokemon.alto} || Ancho: {pokemon.ancho}
        </p>
      </div>
    </div>
  ) : null;
};
