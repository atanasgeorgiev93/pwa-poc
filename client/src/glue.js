import { SET_CLIENT_METHOD } from "./constants";

export const setClientPortfolioInterop = glue => ({ clientId, clientName }) => {
  const isMethodRegistered = glue.interop
    .methods()
    .some(({ name }) => name === SET_CLIENT_METHOD.name);
  if (isMethodRegistered) {
    glue.interop.invoke(SET_CLIENT_METHOD.name, { clientId, clientName });
  }
};