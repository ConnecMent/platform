// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        transactionList: resolve(__dirname, "transactionList.html"),
        transfer: resolve(__dirname, "transfer.html"),
        usersindex: resolve(__dirname, "usersindex.html"),
      },
    },
  },
});
