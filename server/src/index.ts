const { ApolloServer } = require("apollo-server-express");
import "reflect-metadata";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/users/Register";
import { LoginResolver } from "./modules/users/Login";
import * as  jsonwebtoken from 'jsonwebtoken';
import { CurrentUser } from "./modules/users/CurrentUser";
import { ProfileResolver } from "./modules/profile/ProfileResolver";
import { UserResolver } from "./modules/users/UserResolver";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, CurrentUser, ProfileResolver, UserResolver],
    authChecker: ({ context }) => {
      if(context.user === null) {
        return false;
      }
      return true;
    }
  });

  const getUser = (token : string) => {
      if(token) {
        try {
          let decodedToken = jsonwebtoken.verify(token, "secret");
          return decodedToken;
        }
        catch(e) {
          return null;
        }
      }
      return null;
  }

  const apolloServer = new ApolloServer({ schema, context: ({req, res}: any) => {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token);
    return {
      user,
      req,
      res
    }
  }});
    

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("Server started on port 350");
  });
};

main();
