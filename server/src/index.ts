const { ApolloServer } = require("apollo-server-express");
import "reflect-metadata";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/users/Register";
import { LoginResolver } from "./modules/users/Login";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver]
  });

  const apolloServer = new ApolloServer({ schema, context: ({req, res}: any) => ({req, res}) });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("Server started on port 350");
  });
};

main();
