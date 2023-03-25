import urlQueryParts from "./urlQueryParts";

const API_BASE_URL = "https://frontexam.dock8.66bit.ru";
const API_PRODUCTS = "api/products";
const API_URL = `${API_BASE_URL}/${API_PRODUCTS}`;

// ACCOUNT
export const postRegistrationAPI = () => API_BASE_URL + "/registration";
export const postLoginAPI = () => API_BASE_URL + "/login";
export const getProfileAPI = () => API_BASE_URL + "/profile";
export const getRefreshTokenAPI = () => API_BASE_URL + "/refresh";
export const postLogoutAPI = () => API_BASE_URL + "/logout";
export const getFavoritesAPI = () => API_BASE_URL + "/favorites";

// PRODUCTS
export const getProductsAPI = (data: object) => API_URL + urlQueryParts(data);
export const getFiltersAPI = () => API_URL + "/getFilter";
export const setFavoriteAPI = (id: string) => API_URL + id + "/setFavourite";
export const removeFavoriteAPI = (id: string) =>
  API_URL + id + "/removeFavourite";
