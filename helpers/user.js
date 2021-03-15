const User = require('../models/user.js');

module.exports = {
  getById: function getById(id) {
    try {
      return User.findById(id);  
    } catch (error) {
      console.log(`Helpers - User - getById() => ${error}`);
    }
  },
  // params must be an object
  // {
  //   id,
  //   user_name,
  //   ...
  // }
  getUser: function getUser(params) {
    try {
      return User.findOne(params);  
    } catch (error) {
      console.log(`Helpers - User - getUser() => ${error}`);
    }
  },
  createUser: function createUser(params) {
    try {
      // Creating empty user object 
      let newUser = new User(); 
      newUser.user_name = 'danielvvz';
      newUser.name = 'daniel';
      newUser.last_name = 'vargas'
      // Call setPassword function to hash password
      newUser.setPassword('queso');
      // Save newUser object to database 
      return newUser.save();
    } catch (error) {
      console.log(`Helpers - User - createUser() => ${error}`);
    }
  },
  validatePassword: async function validatePassword(user_name, password) {
    try {
      var valid = false;
      await User.findOne({ user_name : user_name }, function(err, user) { 
        if (user === null) { 
            /*return res.status(400).send({ 
                message : "User not found."
            });*/
        } else { 
          valid = user.validPassword(password);
        } 
      });
      return valid;
    } catch (error) {
      console.log(`Helpers - User - validatePassword() => ${error}`);
    }
  }
}