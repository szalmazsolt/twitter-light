const getUserMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {
    const user = userModel.findOne({ id: req.session.userId });

    res.locals.user = user;

    next();
  };
};

module.exports = getUserMW;