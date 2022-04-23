const auth = (objectRepo) => {

  const { userModel } = objectRepo;

  return (req, res, next) => {
    console.log('Auth mw runs')
    if (typeof req.session.userId === 'undefined') {
      // You have to login first?? redirect('/login')
      console.log('Not logged in')
      // res.locals.loggedInUserId = null;
      next();
      // return res.status(401).render('error');
    }

    const loggedInUser = userModel.findOne({ id: req.session.userId })

    if (loggedInUser === null) {
      console.log('NUUUUUUUUUUUUUULLLLLLLL')
    }

    res.locals.loggedInUser = loggedInUser;
    console.log('Seems OK!!!')
    next();
  };
};

module.exports = auth;