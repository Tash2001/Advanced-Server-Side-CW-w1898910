const bcrypt = require('bcrypt'); // to password hash

class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  register(user, callback) {
    this.userDao.getByEmail(user.email, (err, existingUser) => {
      if (existingUser) return callback(new Error('Email already in use'));
    
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return callback(err);
        this.userDao.create({ ...user, password: hash }, callback);
      });
    });
  }

  login(email, password, callback) {
    this.userDao.getByEmail(email, (err, user) => {
      if (err || !user) return callback(new Error('User not found'));

      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) return callback(new Error('Invalid password'));
        callback(null, user);
      });
    });
  }
}

module.exports = UserService;
