import axios from "axios";


const api = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/all",
});

export default api;