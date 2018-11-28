const express = require('express');
const mongoose = require('mongoose'); //connect our app to mlab using mongoose, also building our schema
const bodyParser = require('body-parser'); //need for json request and responses
// const path = require('path');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' }); //this will allow us to create different variables for those entries that we provided in our .env file...

//import both recipe and user JS files...
const Recipe = require('./models/Recipe');
const User = require('./models/User');

//************************ */
//*********************** */
// Bring in GraphQL-Express middleware --> these two tools will allow us to essentially connect to GraphQL with Express...
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
//Bring in schema and resolvers...
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
//************************ */
//************************ */
// Create GraphQL schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
//************************ */
//************************ */

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initializes application
const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true
// };
// app.use(cors('*'));

// Set up JWT authentication middleware
// app.use(async (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (token !== 'null') {
//     try {
//       const currentUser = await jwt.verify(token, process.env.SECRET);
//       req.currentUser = currentUser;
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   next();
// });

// Create GraphiQL application --> basically type in browser --> "http://localhost:4444/graphiql"
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect schemas with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
      //currentUser
    }
  })
);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 4444;

//We will see this when ever server starts
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`); //we are using ${PORT} to get the port no. dynamically
});
