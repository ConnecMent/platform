console.warn(import.meta, process.env);
export const apiUrl = `http://${import.meta.env.VITE_API_HOST}:${
  import.meta.env.VITE_API_PORT
}`;
