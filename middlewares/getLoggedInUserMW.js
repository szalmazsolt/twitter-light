const getLoggedInUserMW = (objectRepo) => {
  const { userModel } = objectRepo;

  return (req, res, next) => {

    const loggedInUser = userModel.findOne({ id: req.session.userId });

    if (loggedInUser === null) {
      return next();
    }

    res.locals.loggedInUser = loggedInUser;
    next();
  };
};

module.exports = getLoggedInUserMW;