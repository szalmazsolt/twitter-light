const updateBioMW = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {

    const { bio } = req.body;

    res.locals.user.profileData.bio = bio;

    userModel.update(res.locals.user);

    next();

  }
};

module.exports =updateBioMW;