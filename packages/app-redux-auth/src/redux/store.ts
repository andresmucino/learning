import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { pokemonReducer } from "./PokemonReducer";
import { UsuariosReducer, leerUsuarioActivoAction } from "./UsersReducer";

const rootReducer = combineReducers({
  pokemones: pokemonReducer,
  usuario: UsuariosReducer,
});

export const generateStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  leerUsuarioActivoAction()(store.dispatch);

  return store;
};
