const setupSignupErrorsMW = () => {

  return (req, res, next) => {
    userData = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    };

    const errorMessages = {
      username: null,
      email: null,
      password: null
    };

    res.locals.errorMessages = errorMessages;
    res.locals.userData = userData; 

    next();
  };
};

module.exports = setupSignupErrorsMW;