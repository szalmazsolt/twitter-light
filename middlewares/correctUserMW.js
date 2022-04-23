const correctUserMW = (options={ continueMwFlow: false}) => {

  const { continueMwFlow } = options;

  return (req, res, next) => {

    // Check if the currently logged in user is the same user whose data we are trying to access 
    if (req.session.userId !== res.locals.user.id) {
      res.locals.correctUser = false;

      if (continueMwFlow) {
        return next();
      } else {
        return res.status(401).render('error');
      }

    }

    res.locals.loggedInUser = res.locals.user
    res.locals.correctUser = true;
    next();
  };
};

module.exports = correctUserMW;