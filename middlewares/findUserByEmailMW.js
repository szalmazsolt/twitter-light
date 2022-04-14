const findUserByEmailMW = (email, objectRepo) => {
  const { userModel } = objectRepo;

  return (req, res, next) => {
    const user = userModel.findOne({ email })

    if (user !== null) {
      res.locals.errorMessages.email = 'this email has already been registered'
      return next();
    }
     
    return next();
  };
};

module.exports = findUserByEmailMW;