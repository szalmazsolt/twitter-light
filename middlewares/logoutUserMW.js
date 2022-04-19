const logoutUserMW = () => {

  return (req, res, next) => {
    req.session.userId = null;
    res.locals.loggedInUser = null;
    next();
  };

};

module.exports = logoutUserMW;