import axios from "axios";
export default async ({ url, headers, method, body, parametros , cmabioUrl = "assets" }) => {
  let repuesta;
  let ServieApi = axios.create({
    baseURL: `https://rest.coincap.io/v3/${cmabioUrl}`,
  });
  ServieApi.defaults.headers.common["Content-Type"] = "application/json";
  ServieApi.defaults.params = {
    apiKey : "bb02f85445657ef622d59b7c16f6174d32f7417edc17f1fec25d4a4620b53f22" ,
    ...parametros 
  };
  headers = {
    ...ServieApi.defaults.headers.common,
    ...headers,
  };
  try {
    switch (method.toUpperCase()) {
      case "GET":
        repuesta = await ServieApi.get(url, { headers });
        break;
      case "POST":
        repuesta = await ServieApi.post(url, body, { headers });
        break;
      case "PUT":
        repuesta = await ServieApi.put(url, body, { headers });
        break;
      case "DELETE":
        repuesta = await ServieApi.delete(url, { headers });
        break;
      default:
        repuesta = { data: "Metodo no permitido", status: 405 };
        break;
    }
    return { data: repuesta.data, status: repuesta.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
