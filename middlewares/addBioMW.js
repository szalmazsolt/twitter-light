const addBioMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {
    console.log('Add bio route...')
    console.log(req.body)

    res.locals.user.bio = req.body.bio;
    console.log(res.locals.user);

    userModel.update(res.locals.user);

    next();
  };
};

module.exports = addBioMW;