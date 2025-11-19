import { useCredentialsStore } from '@/stores/credentials';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // TODO use env for local + prod options
});

api.interceptors.request.use(async (config) => {
  const credentialsStore = useCredentialsStore();
  config.headers['username'] = credentialsStore.username;
  config.headers['password'] = credentialsStore.password;
  return config;
});

export default api;
