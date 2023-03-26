import axios from "axios";
import { store } from "../store";

const request = async (url: string, method?: string | "GET", data?: object) => {
  const authToken = store.state.token;
  let response = null;
  try {
    if (method === "GET" || method === "get" || !data) {
      response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return await response.data;
  } catch (e: any) {
    console.log(e);
    return e.response;
  }
};

export default request;
