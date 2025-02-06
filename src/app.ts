// initialize the server
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Request, Response } from "express";
import { resolver } from "./gql/resolver.js";
import { schema } from "./gql/schema.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    credentials: true,
  })
);

app.use(express.json());

// create a new Apollo Server instance
// const server = new ApolloServer({
//   typeDefs: `#graphql
//     type Query{
//     hello(myname:String): String,
//     }
// `,
//   resolvers: {
//     Query: {
//       hello: (_: any, args: { myname: String }) => `Hello ${args.myname}`,
//     },
//   },
// });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
});

app.get("/example", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

await server.start();
app.use(
  "/graphql",
  expressMiddleware(server)
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
