import axios from "axios";

// contantes
const dataInicial = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const OBTENER_POKEMONES = "OBTENER_POKEMONES";
const SUIENTE_POKEMONES = "SUIENTE_POKEMONES";
const ANTERIOR_POKEMONES = "ANTERIOR_POKEMONES";
const POKE_INFO_EXITO = "POKE_INFO_EXITO";

// reducer

export const pokemonReducer = (state = dataInicial, action: any) => {
  switch (action.type) {
    case OBTENER_POKEMONES:
      return { ...state, ...action.payload };

    case SUIENTE_POKEMONES:
      return { ...state, ...action.payload };

    case ANTERIOR_POKEMONES:
      return { ...state, ...action.payload };

    case POKE_INFO_EXITO:
      return { ...state, pokemon: action.payload };

    default:
      return state;
  }
};

export const obtenerPokemonesAccion = () => async (dispatch: any) => {
  if (localStorage.getItem("offset=0")) {
    console.log("datos local storage");
    dispatch({
      type: OBTENER_POKEMONES,
      //@ts-ignore
      payload: JSON.parse(localStorage.getItem("offset=0")),
    });
    return;
  }
  try {
    console.log("datos desde la api");
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
    );
    dispatch({
      type: OBTENER_POKEMONES,
      payload: res.data,
    });
    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const siguientePokemonAction =
  () => async (dispatch: any, getState: any) => {
    const { next } = getState().pokemones;

    if (localStorage.getItem(next)) {
      console.log("datos local storage");
      dispatch({
        type: SUIENTE_POKEMONES,
        payload: localStorage.getItem(next),
      });
    }

    try {
      console.log("datos desde la api");

      const res = await axios.get(next);

      dispatch({
        type: SUIENTE_POKEMONES,
        payload: res.data,
      });
      localStorage.setItem(next, JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export const anteriorPokemonAccion =
  () => async (dispatch: any, getState: any) => {
    const { previous } = getState().pokemones;

    if (localStorage.getItem(previous)) {
      console.log("datos local storage");
      dispatch({
        type: ANTERIOR_POKEMONES,
        payload: localStorage.getItem(previous),
      });
    }
    try {
      const res = await axios.get(previous);

      dispatch({
        type: ANTERIOR_POKEMONES,
        payload: res.data,
      });
      localStorage.setItem(previous, JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export const detallePokemonAction = (url?: any) => async (dispatch: any) => {
  if (url === undefined) {
    url = "https://pokeapi.co/api/v2/pokemon/1/";
  }

  if(localStorage.getItem(url)) {
    dispatch({
        type: POKE_INFO_EXITO,
        payload: JSON.parse(localStorage.getItem(url) as string),
      });
  }

  try {
    const res = await axios.get(url);

    dispatch({
      type: POKE_INFO_EXITO,
      payload: {
        nombre: res.data.name,
        ancho: res.data.weight,
        alto: res.data.height,
        foto: res.data.sprites.front_default,
      },
    });

    localStorage.setItem(
      url,
      JSON.stringify({
        nombre: res.data.name,
        ancho: res.data.weight,
        alto: res.data.height,
        foto: res.data.sprites.front_default,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
