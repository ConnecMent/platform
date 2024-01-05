import { DataSource } from "typeorm";

import entities from "./db/entities";

import migrations from "./db/migrations";

import { postgresUrl } from "./configs";

export const dataSource = new DataSource({
  type: "postgres",
  url: postgresUrl,
  entities,
  migrations,
  synchronize: false,
  logging: false,
});
