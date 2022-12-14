// import axios from 'axios';
// const BASE_URL = 'http://goapi.kuroyamii.works';

// export default axios.create({
//     baseURL: BASE_URL
// });

import axios from "axios";

export const API = axios.create({
  baseURL: "http://goapi.kuroyamii.works/",
});

// export const axiosPrivate = axios.create({
//     baseURL: API,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// });