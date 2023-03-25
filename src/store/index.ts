import React from "react";
import createStore from "use-global-hook-ts";

interface IAppState {
  updateDependencies: boolean;
  dataLoaded: boolean;
  token: string | null;
}

const initialState: IAppState = {
  updateDependencies: false,
  dataLoaded: false,
  token:
    localStorage.getItem("token") !== null ? localStorage.getItem("token") : "",
};

export const { useGlobal, store } = createStore(React, initialState, {
  debug: false,
});

export const actions = {
  setUpdateDependencies: (newValue: boolean) => {
    store.setState({ updateDependencies: newValue });
  },
  setLoaded: (newValue: boolean) => {
    store.setState({ dataLoaded: newValue });
  },
  setToken: (newValue: string) => {
    store.setState({ token: newValue });
  },
};
