import React, { createContext, useState, useContext } from "react";
import db from "../../data.json";

const context = createContext();

function Provider({ children }) {
  const [data, setData] = useState({ ...db });
  const [active, setActive] = useState(false);
  return (
    <context.Provider value={{ data, setData, active, setActive }}>
      {children}
    </context.Provider>
  );
}

function getContext() {
  return useContext(context);
}

export { context, Provider, getContext };
