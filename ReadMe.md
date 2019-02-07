
Getting Started
---
```
git clone 
cd graphql-eg
npm install
npm run dev
```
run http://localhost:3000

GraphQl
---
*  GraphQl is an Api query language. "Rest in steroids".
*  Allows using single endpoint which reduce response time there fore avoid over or under fetching.

Types
---
Data Model representation
```
type User {
  id: ID! # The "!" means required
  firstname: String
  lastname: String
  email: String
  projects: [Project] # Project is another GraphQL type
}
```

1.  Queries
----
Queries that can be run on GraphQl API.

```
type RootQuery {
  user(id: ID): User           # Corresponds to GET /api/users/:id
  users: [User]                # Corresponds to GET /api/users
  project(id: ID!): Project    # Corresponds to GET /api/projects/:id
  projects: [Project]          # Corresponds to GET /api/projects
  task(id: ID!): Task          # Corresponds to GET /api/tasks/:id
  tasks: [Task]                # Corresponds to GET /api/tasks
}
```
2.  Mutation
----
It does CRUD query except the "R"
```
type RootMutation {
  createUser(input: UserInput!): User             # Corresponds to POST /api/users
  updateUser(id: ID!, input: UserInput!): User    # Corresponds to PATCH /api/users
  removeUser(id: ID!): User                       # Corresponds to DELETE /api/users

  createProject(input: ProjectInput!): Project
  updateProject(id: ID!, input: ProjectInput!): Project
  removeProject(id: ID!): Project
  
  createTask(input: TaskInput!): Task
  updateTask(id: ID!, input: TaskInput!): Task
  removeTask(id: ID!): Task
}
```

Schema
---
with types we define GraphQl schema which is what the GraphQl endpoint exposes to the world
```
schema {
  query: RootQuery
  mutation: RootMutation
}
```

Resolvers
---
This does the hard work of telling GraphQl what to do on every query/mutation request.
```
const models = sequelize.models;

RootQuery: {
  user (root, { id }, context) {
    return models.User.findById(id, context);
  },
  users (root, args, context) {
    return models.User.findAll({}, context);
  },
  // Resolvers for Project and Task go here
},
```


Things To Know
---
-  **Graphiql:** is a GraphQL IDE in which you can easily check your queries. 
        -  you can visit it at - http://localhost:3000/graphiql

**Note:** This is just a brief, there are more features like real-time updates, authentication, authorization, file uploading and more that happens can be done with [GraphQl](https://www.howtographql.com/)