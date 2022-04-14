const loginUserMW = () => {

  return (req, res, next) => {
    console.log('login user middleware runs...')
    req.session.userId = res.locals.userId;
    next();
  }

};

module.exports = loginUserMW;