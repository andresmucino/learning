import React from "react";
import { Provider } from "react-redux";
import { Pokemones } from "./components";
import { generateStore } from "./redux/store";

export const App = () => {
  const store = generateStore();

  return (
    <Provider store={store}>
      <div className="container mt-3">
        <Pokemones />
      </div>
    </Provider>
  );
};
