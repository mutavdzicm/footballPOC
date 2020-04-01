import axios from "axios";

// Create axios client, pre-configured with baseURL
let API = axios.create({
  baseURL: "https://api.football-data.org/",
  timeout: 10000
});
API.defaults.headers.common["X-Auth-Token"] =
  "e72d71ca22bd4ab6842ea4bad1effbd0";

export default API;
