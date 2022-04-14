const deleteUserMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {
    userModel.remove(res.locals.user)

    next();
  };

};

module.exports = deleteUserMW;