import api from "./api";

const dividendService = {
  getDividends: async (year, month, filterBy) => {
    return await api.get(
      `/cse/dividends/calendar?year=${year}&month=${month}&filterBy=${filterBy}`,
    );
  },
};

export default dividendService;
