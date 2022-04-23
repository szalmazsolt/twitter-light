const correctUserMW = (objectRepo, options={ continueMwFlow: false}) => {

  const { continueMwFlow } = options;
  const { userModel } = objectRepo;

  return (req, res, next) => {

    const user = userModel.findOne({ id: req.session.userId });

    res.locals.loggedInUser = user;

    // Check if the currently logged in user is the same user whose data we are trying to access 
    if (req.session.userId !== res.locals.user.id) {
      res.locals.correctUser = false;

      if (continueMwFlow) {
        return next();
      } else {
        return res.status(401).render('error');
      }

    }

    
    res.locals.correctUser = true;
    next();
  };
};

module.exports = correctUserMW;