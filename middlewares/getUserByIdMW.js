const getUserByIdMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {
    const user = userModel.findOne({ id: req.params.id });

    if (user === null) {
      const error = 'User not found by given ID';
      return res.status(404).render('error', { error });
    }

    res.locals.user = user;
    return next();
  };

};

module.exports = getUserByIdMW;