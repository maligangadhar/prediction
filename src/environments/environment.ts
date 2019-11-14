const gatewayEndPoint = "http://localhost:4200";
const gatewayEndPoint2 = "http://10.50.23.148:8000";

export const environment = {
  production: true,
  BASE_API_URL: gatewayEndPoint,
  BASE_API_URL2: gatewayEndPoint2,
  predictionUrl: "/fpapi/predict/",
  checkCSVUrl: "/chk",
  predictResultListUrl: "/assets/predict.json"
};
