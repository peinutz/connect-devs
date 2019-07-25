const { ApolloServer } = require("apollo-server-express");
import "reflect-metadata";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/users/Register";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  // const apolloServer = new ApolloServer({ schema, path: "api/graphql" });
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("Server started on port 350");
  });
};

main();
