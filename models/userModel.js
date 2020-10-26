const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  licenses: { type: [String], default: [] },
  sandbox: { type: Boolean, default: false}
});

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err,hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.validatePassword = async (password) => {
  const result = await bcrypt.compare(this.password, password);
  return result;
}

const user = mongoose.model("User", UserSchema);


module.exports = user;
