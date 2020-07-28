const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: String,
  facebookId: String
});

mongoose.model('users', userSchema);
