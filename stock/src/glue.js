import { SET_CLIENT_METHOD } from "./constants";

export const registerSetClientMethod = setClient => glue => {
  glue.interop.register(SET_CLIENT_METHOD, setClient);
};

export const openStockDetails = glue => symbol => {
    glue.windows.open(
      `StockDetailsReact${Math.random().toFixed(2) * 100}`,
      `http://${window.location.host}/details`,
      { top: 100, left: 100, height: 660, width: 660, context: { symbol } }
    );
};

export const getMyWindowContext = glue => glue.windows.my().context;
