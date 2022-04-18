const createUserMW = (objectRepo) => {
  const { userModel, uuidv4 } = objectRepo;

  return (req, res, next) => {
    console.log('createUserMW runs...')

    const newUser = {
      id: uuidv4(),
      username: res.locals.userData.username,
      email: res.locals.userData.email,
      password: res.locals.userData.password,
      createdAt: new Date(),
      profile_img: null
    }

    userModel.insert(newUser);
    res.locals.userId = newUser.id;

    next();
  };

};

module.exports = createUserMW;