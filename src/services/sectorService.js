import api from './api';

const sectorService = {
  getSectors: async () => {
    const response = await api.get('/cse/sector-insights');
    return response.data?.data ?? [];
  },
};

export default sectorService;