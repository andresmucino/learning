import axios from "axios";

const initialData = {
  count: 0,
  previous: null,
  next: null,
  results: [],
};

const OBTENER_PKEMONES = "OBTENER_PKEMONES";
const SIGUIENTE_POKEMONES = "SIGUIENTE_POKEMONES";
const ANTERIOR_POKEMONES = "ANTERIOR_POKEMONES";
const POKE_INFO_EXITO = "POKE_INFO_EXITO";

export const pokeReducer = (state = initialData, action: any) => {
  switch (action.type) {
    case OBTENER_PKEMONES:
      return { ...state, ...action.payload };

    case SIGUIENTE_POKEMONES:
      return { ...state, ...action.payload };

    case ANTERIOR_POKEMONES:
      return { ...state, ...action.payload };

    case POKE_INFO_EXITO:
      return { ...state, pokemon: action.payload };

    default:
      return { ...state };
  }
};

export const obtenerPokemones = () => async (dispatch: any) => {
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: OBTENER_PKEMONES,
      payload: JSON.parse(localStorage.getItem("offset=0") as string),
    });
  }

  try {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    );

    dispatch({
      type: OBTENER_PKEMONES,
      payload: res.data,
    });
    localStorage.setItem("offset=0", JSON.stringify(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const siguientePokemonesAction =
  () => async (dispatch: any, getState: any) => {
    const { next } = getState().pokemones;

    if (localStorage.getItem(next)) {
      dispatch({
        type: SIGUIENTE_POKEMONES,
        payload: JSON.parse(localStorage.getItem(next) as string),
      });
    }

    try {
      const res = await axios.get(next);

      dispatch({
        type: SIGUIENTE_POKEMONES,
        payload: res.data,
      });
      localStorage.setItem(next, JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

export const anteriorPokemones =
  () => async (dispatch: any, getState: any) => {
    const { previous } = getState().pokemones;

    if (localStorage.getItem(previous)) {
      dispatch({
        type: ANTERIOR_POKEMONES,
        payload: JSON.parse(localStorage.getItem(previous) as string),
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
          //@ts-ignore
          payload: JSON.parse(localStorage.getItem(url)),
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