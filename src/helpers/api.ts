import urlQueryParts from "./urlQueryParts";

const API_BASE_URL = "https://frontexam.dock8.66bit.ru/";
const API_PRODUCTS = "api/products";
const API_URL = `${API_BASE_URL}${API_PRODUCTS}`;

// PRODUCTS
export const getProductsAPI = (data: object) => API_URL + urlQueryParts(data);
export const getFiltersAPI = () => API_URL + "getFilter";
export const setFavoriteAPI = (id: string) => API_URL + id + "/setFavourite";
export const removeFavoriteAPI = (id: string) =>
  API_URL + id + "/removeFavourite";
