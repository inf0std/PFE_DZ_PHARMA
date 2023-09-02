import axios from "axios";
import { loggedOut } from "../auth";
import { store } from "../store";
//import { API_URL } from "../../constants";
const baseApiUrl = "http://192.168.1.12:8000/api/v1";
// Custom base query function using Axios
axios.interceptors.request.use(
  (config) => {
    let token = store.getState().persisted.auth.value.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      store.dispatch(loggedOut());
    }
    return Promise.reject(error);
  }
);

const axiosBaseQuery = async (
  { url, params, body, headers, method },
  api,
  extraOptions
) => {
  try {
    const response = await axios({
      method,
      url: url,
      params,
      baseURL: baseApiUrl,
      headers,
      data: body,
    });
    return { data: response.data };
  } catch (error) {
    return { error }; //
  }
};

export default axiosBaseQuery;
