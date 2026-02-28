import api from './api';

const sectorService = {
  getSectors: async () => {
    return await api.get('/cse/sectors-list');
  },
};

export default sectorService;
