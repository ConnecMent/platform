import express from "express";

import { apiPort, apiHost } from "@/configs";

import router from "./router/v1";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/", router);
const startApp = () => {
  app.listen(apiPort, apiHost, () => {
    console.log(`Service started at http://${apiHost}:${apiPort}`);
  });
};

export default startApp;
