const envs = process.env;

const baseUrl =
  envs['NODE_ENV'] === 'production' ? '/api' : 'http://localhost:3002';

export { baseUrl };
