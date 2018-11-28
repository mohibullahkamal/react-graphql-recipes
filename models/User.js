const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  //every username must be unique else it will be rejected...
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  //when user joined...
  joinDate: {
    type: Date,
    default: Date.now
  },
  //It will hold all user favorites...
  favorites: {
    type: [Schema.Types.ObjectId], //will hold all recipe they liked... we are gonna have an array of all IDs in our database...
    ref: 'Recipe'
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

//export model schema...
module.exports = mongoose.model('User', UserSchema);
