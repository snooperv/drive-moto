import request from "../helpers/request";
import {
  getProductsAPI,
  getFiltersAPI,
  setFavoriteAPI,
  removeFavoriteAPI,
} from "../helpers/api";

export const getProducts = async (data: object) => {
  return await request(getProductsAPI(data));
};

export const getFilters = async () => {
  return await request(getFiltersAPI());
};

export const setFavorite = async (id: string) => {
  return await request(setFavoriteAPI(id), "PUT");
};

export const removeFavorite = async (id: string) => {
  return await request(removeFavoriteAPI(id), "PUT");
};
