module.exports = {
    database: 'mongodb://localhost:27017/banco1',
    secret: 'segredo'
  };
  
  const mongoose = require('mongoose');
  const bcrypt = require('bcrypt');
  const Schema = mongoose.Schema;
  
  const UserSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
  });
  
  UserSchema.pre('save', function(next) {
    const user = this;
  
    if (!user.isModified('senha')) {
      return next();
    }
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
  
      bcrypt.hash(user.senha, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
  
        user.senha = hash;
        next();
      });
    });
  });
  
  UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.senha, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
  
      callback(null, isMatch);
    });
  };
  