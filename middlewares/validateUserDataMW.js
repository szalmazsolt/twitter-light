const validateUserDataMW = (objectRepo) => {
  
  const { userModel } = objectRepo;

  return (req, res, next) => {
      console.log('validateUserDataMW runs...')
      console.log(res.locals.loggedInUser)
      
      res.locals.userData = {
        username: req.body.username.trim(),
        email: req.body.email.toLowerCase().trim(),
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
      };

      res.locals.errorMessages = {
        username: null,
        email: null,
        password: null,
      };

      userModel.findOne({ email: res.locals.userData.email }) !== null ? res.locals.errorMessages.email = 'this email has already been registered' : ''

      !res.locals.userData.username ? res.locals.errorMessages.username = 'username cannot be blank' : ''
      !res.locals.userData.email ? res.locals.errorMessages.email = 'email cannot be blank' : ''
      !res.locals.userData.password ? res.locals.errorMessages.password = 'password cannot be blank' : ''
      res.locals.userData.password !== res.locals.userData.password_confirmation ? res.locals.errorMessages.password = 'passwords do not match' : ''

      const isValidUserData = Object.values(res.locals.errorMessages).every(value => {
        return value === null
      });

      console.log(isValidUserData);

      if (!isValidUserData) {
        console.log(res.locals)
        return res.render('users/register_form', res.locals);
      }

      console.log(res.locals)
      next();

      
  };
};

module.exports = validateUserDataMW;