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

const toCalendarRows = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};

const fetchCalendar = async (year, month, filterBy) => {
  const params = new URLSearchParams();

  if (year) {
    params.append("year", String(year));
  }

  if (month) {
    params.append("month", String(month));
  }

  if (filterBy) {
    params.append("filterBy", String(filterBy));
  }

  const query = params.toString();
  const url = query
    ? `/cse/dividends/calendar?${query}`
    : "/cse/dividends/calendar";

  const response = await api.get(url);
  const data = unwrapApiData(response);
  return toCalendarRows(data);
};

const dividendService = {
  // Main method used by DividendCalendar page.
  getCalendar: async (year, month, filterBy) => {
    return fetchCalendar(year, month, filterBy);
  },

  // Backward-compatible alias.
  getDividends: async (year, month, filterBy) => {
    return fetchCalendar(year, month, filterBy);
  },
};

export default dividendService;
