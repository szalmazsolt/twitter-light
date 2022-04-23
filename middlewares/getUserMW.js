const getUserMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {
    const user = userModel.findOne({ id: req.session.userId });

    res.locals.loggedInUser = user;
    console.log(res.locals.loggedInUser)
    next();
  };
};

module.exports = getUserMW;