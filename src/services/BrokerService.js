import api from "./api";

const unwrapApiData = (response) => {
  if (!response) {
    return [];
  }

  if (
    response.data &&
    Object.prototype.hasOwnProperty.call(response.data, "data")
  ) {
    return response.data.data;
  }

  return response.data ?? [];
};

const toBrokerRows = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.content)) {
    return data.content;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};

const Brokers = {
  getMemberBrokers: async () => {
    const response = await api.get("/cse/memberBrokers");
    const data = unwrapApiData(response);
    return toBrokerRows(data);
  },
  getTradingBrokers: async () => {
    const response = await api.get("/cse/tradingBrokers");
    const data = unwrapApiData(response);
    return toBrokerRows(data);
  },
};

export default Brokers;
