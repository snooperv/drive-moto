import request from "../helpers/request";
import {
  getFavoritesAPI,
  getProfileAPI,
  getRefreshTokenAPI,
  postLoginAPI,
  postLogoutAPI,
  postRegistrationAPI,
} from "../helpers/api";

export const postRegistration = async (data: object) => {
  return await request(postRegistrationAPI(), "POST", data);
};

export const postLogin = async (data: object) => {
  return await request(postLoginAPI(), "POST", data);
};

export const getProfile = async () => {
  return await request(getProfileAPI());
};

export const getRefreshToken = async () => {
  return await request(getRefreshTokenAPI());
};

export const postLogout = async (data: object) => {
  return await request(postLogoutAPI(), "POST", data);
};

export const getFavorites = async (data: object) => {
  return await request(getFavoritesAPI(data));
};
