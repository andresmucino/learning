/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { detallePokemonAction } from "../../redux";

export const Detalle = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchaData = () => {
      //@ts-ignore
      dispatch(detallePokemonAction());
    };
    fetchaData();
  }, [dispatch]);

  const pokemon = useSelector((store: any) => store?.pokemones);

  if(!pokemon.length) {
    <p>Loading....</p>
  }

  return (
    <div className="card mt-4 text-center">
      <div className="card-body">
        <img src={pokemon.pokemon.foto} className="img-fluid" />
        <div className="card-title text-uppercase">{pokemon.pokemon.nombre}</div>
        <p className="card-text">
          Alto: {pokemon.pokemon.alto} || Ancho: {pokemon.pokemon.ancho}
        </p>
      </div>
    </div>
  );
};
