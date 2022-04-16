const getUserByEmailMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {
    const user = userModel.findOne({ email: req.body.email });

    res.locals.user = user;

    next();
  };
};

module.exports = getUserByEmailMW;