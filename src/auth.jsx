import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.72.14:8080",
  // baseURL: "https://goapi.kuroyamii.works/",
});

// export const setAuthToken = (token) => {
//   if (token) {
//     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete API.defaults.headers.common["Authorization"];
//   }
// };
