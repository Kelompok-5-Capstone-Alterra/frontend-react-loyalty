import axios from "axios";

export const API = axios.create({
  baseURL: "http://goapi.kuroyamii.works/",
});
