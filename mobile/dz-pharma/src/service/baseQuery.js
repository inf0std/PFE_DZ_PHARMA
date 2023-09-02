import axios from "axios";
import { store } from "../../redux/store";
import { HOST } from "../constants";
axios.interceptors.request.use(
  (config) => {
    /*  let token = store.getState().auth.auth.value.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } */
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("not authorized");
      //store.dispatch(loggedOut());
    }
    return Promise.reject(error);
  }
);

const axiosBaseQuery = async (
  { url, params, body, headers, method },
  api,
  extraOptions
) => {
  //console.log("url", url, "body", body);
  try {
    const response = await axios({
      method,
      url: url,
      params,
      baseURL: HOST,
      headers,
      data: body,
    });
    return { data: response.data };
  } catch (error) {
    return { error }; //
  }
};

export default axiosBaseQuery;
