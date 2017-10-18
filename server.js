import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import cors from 'cors';

import Schema from './data/schema';
import Mocks from './data/mocks';

const GRAPHQL_PORT = process.env.PORT || 7000;
const app = express();
const graphQLServer = createServer(app);

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: true,
});

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {},
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`Server running at port: ${GRAPHQL_PORT}`);
});
