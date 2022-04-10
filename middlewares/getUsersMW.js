const getUsersMW = (objectRepo) => {
  const { userModel } = objectRepo;

  return (req, res, next) => {
    const users = userModel.find()

    if (users === null) {
      return res.status(500).render('error');
    }

    res.locals.users = users;
    return next();
  };
};

module.exports = getUsersMW;