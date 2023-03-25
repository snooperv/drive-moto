import React from "react";
import createStore from "use-global-hook-ts";

interface IAppState {
  updateDependencies: boolean;
  dataLoaded: boolean;
}

const initialState: IAppState = {
  updateDependencies: false,
  dataLoaded: false,
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
};
