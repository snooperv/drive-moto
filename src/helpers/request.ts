import axios from "axios";

const request = async (url: string, method?: string | "GET", data?: object) => {
  let response = null;
  try {
    if (method === "GET" || method === "get" || !data) {
      response = await axios({
        method,
        url,
      });
    } else {
      response = await axios({
        method,
        url,
        data,
      });
    }

    return await response.data;
  } catch (e: any) {
    console.log(e);
  }
};

export default request;
