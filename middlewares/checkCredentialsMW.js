const checkCredentialsMW = () => {

  return (req, res, next) => {

    if (res.locals.user === null || res.locals.user.password !== req.body.password) {
      res.locals.error = 'Invalid credentials';
      return res.status(400).render('login_form', res.locals);
    }

    res.locals.userId = res.locals.user.id;
    return next();
  };
};

module.exports = checkCredentialsMW;