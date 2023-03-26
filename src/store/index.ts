import React from "react";
import createStore from "use-global-hook-ts";
import { cardProps } from "../components/cards/cardsContent/cardProps";

interface IAppState {
  updateDependencies: boolean;
  dataLoaded: boolean;
  token: string | null;
  username: string;
  cart: Array<cardProps>;
  cartCounts: number;
}

const initialState: IAppState = {
  updateDependencies: false,
  dataLoaded: false,
  token:
    localStorage.getItem("token") !== null ? localStorage.getItem("token") : "",
  username: "",
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  cartCounts: Number(localStorage.getItem("cartCounts")) || 0,
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
  setUsername: (newValue: string) => {
    store.setState({ username: newValue });
  },
  setCardCounts: (newValue: number) => {
    localStorage.setItem("cartCounts", String(newValue));
    store.setState({ cartCounts: newValue });
  },
  addCart: (newValue: cardProps) => {
    const newCart = store.state.cart;
    const cart = newCart.filter((item) => item.id === newValue.id)[0];
    if (cart && cart.count) {
      cart.count++;
    } else {
      newValue.count = 1;
      newCart.push(newValue);
    }
    actions.setCardCounts(store.state.cartCounts + 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    store.setState({ cart: newCart });
  },
  removeCart: (newValue: cardProps) => {
    let newCart = store.state.cart;
    const cart = newCart.filter((item) => item.id === newValue.id)[0];
    if (cart.count && cart.count > 1) {
      cart.count--;
    } else {
      newCart = newCart.filter((item) => item.id !== newValue.id);
    }
    actions.setCardCounts(store.state.cartCounts - 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    store.setState({ cart: newCart });
  },
  removeCartAll: (newValue: cardProps) => {
    let newCart = store.state.cart;
    const cart = newCart.filter((item) => item.id === newValue.id)[0];
    if (cart.count) {
      actions.setCardCounts(store.state.cartCounts - cart.count);
    }
    newCart = newCart.filter((item) => item.id !== newValue.id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    store.setState({ cart: newCart });
  },
};
