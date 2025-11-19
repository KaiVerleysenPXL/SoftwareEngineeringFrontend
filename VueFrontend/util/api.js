import { useCredentialsStore } from '@/stores/credentials';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5019', // TODO use env for local + prod options
});

api.interceptors.request.use(async (config) => {
  const credentialsStore = useCredentialsStore();
  config.headers['username'] = credentialsStore.username;
  config.headers['password'] = credentialsStore.password;
  return config;
});

export default api;
