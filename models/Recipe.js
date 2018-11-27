const mongoose = require('mongoose');
const Schema = mongoose.Schema; //we use a property of mongoose...

//************************ */
//************************ */
// Note Below are all MONGOOSE Models...
//************************ */
//************************ */

//create a schema variable
const RecipeSchema = new Schema({
  //we want every recipe to have a name...required set to true
  //that means it is compulsory..
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  //instruction for recipes
  instructions: {
    type: String,
    required: true
  },
  //Date when the recipe was created
  createdDate: {
    type: Date,
    default: Date.now
  },
  //no. of likes...
  likes: {
    type: Number,
    default: 0
  },
  //We want to know which user created the recipe...
  username: {
    type: String
  }
});

RecipeSchema.index({
  '$**': 'text'
});

//We want to export the schema...
module.exports = mongoose.model('Recipe', RecipeSchema);
