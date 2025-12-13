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
        let res = await api.post('/logincheck');
        return res.status == 200;
      } catch {
        return false;
      }
    },
    clear() {
      this.username = null;
      this.password = null;
    },
  },
});
