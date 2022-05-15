import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { pokeReducer } from "./pokeReducer";

const rootReducer = combineReducers({
  pokemones: pokeReducer,
});

export const generateStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return store;
};
