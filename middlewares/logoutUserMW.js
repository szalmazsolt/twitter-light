const logoutUserMW = () => {

  return (req, res, next) => {
    req.session.userId = null;
    next();
  };

};

module.exports = logoutUserMW;