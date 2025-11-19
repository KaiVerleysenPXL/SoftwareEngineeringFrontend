import { defineStore } from 'pinia';
import api from '@/util/api';

export const useCredentialsStore = defineStore('credentials', {
  state: () => ({
    username: null,
    password: null,
  }),
  actions: {
    async verify() {
      try {
        let res = await api.post('/check');
        return res.status == 200;
      } catch {
        return false;
      }
    },
  },
});
