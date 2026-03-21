import api from "./api";

const unwrapApiData = (response) => {
  if (!response) return null;
  if (
    response.data &&
    Object.prototype.hasOwnProperty.call(response.data, "data")
  ) {
    return response.data.data;
  }
  return response.data ?? null;
};

const predictionService = {
  getPrediction: async (symbol) => {
    const response = await api.get(`/prediction/${encodeURIComponent(symbol)}`);
    return unwrapApiData(response);
  },
};

export default predictionService;
