const express = require('express');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const cors = require('cors');

const Schema = require('./data/schema');
const Mocks = require('./data/mocks');

const GRAPHQL_PORT = process.env.PORT || 7000;
const app = express();

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

app.listen(GRAPHQL_PORT, () => {
  console.log(`Server running at port: ${GRAPHQL_PORT}`);
});
