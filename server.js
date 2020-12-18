const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require('graphql');

const { data } = require('./mock_data');

// let's pretend that we're building a leads dashboard for sales
// so we should break down the data by industry or job title
// but we should display the relevant people for those industries

// initial schema using buildSchema

const schema = buildSchema(`
  type Query {
    user(id: Int!): User,
    companies: [Company]
  },
  type User {
    first_name: String,
    last_name: String,
    email: String,
    job_title: String,
    id: Int!,
  },
  type Company {
    company_name: String!,
  }
`);

const getUser = (args) => {
  let targetUser = args.id;
  return data.filter(user => user.id === targetUser)[0];
};

const getCompanies = () => {
  let allCompanies = [];
  data.map(company => {
    if (company.company_name && !allCompanies.includes(company.company_name)) {
      allCompanies.push(company);
    }
  });
  return allCompanies;
}

const root = {
  user: getUser,
  companies: getCompanies,
};


const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log("Running on port 4000");