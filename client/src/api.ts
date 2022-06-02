import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
