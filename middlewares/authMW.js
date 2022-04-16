const auth = () => {

  return (req, res, next) => {
    console.log('Auth mw runs')
    if (typeof req.session.userId === 'undefined') {
      // You have to login first?? redirect('/login')
      console.log('Not logged in')
      res.locals.loggedInUserId = null;
      next();
      // return res.status(401).render('error');
    }

    res.locals.loggedInUserId = req.session.userId;
    console.log('Seems OK!!!')
    next();
  };
};

module.exports = auth;