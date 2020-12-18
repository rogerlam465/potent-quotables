const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require('graphql');

const { data } = require('./mock_data');

// initial schema using buildSchema

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);


const helloWorld = () => {
  let hello = "hello";
  let world = "world!";
  return hello + world;
};

const root = {
  hello: helloWorld,
};


const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log("Running on port 4000");