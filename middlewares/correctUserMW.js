const correctUserMW = () => {

  return (req, res, next) => {

    // Check if the currently logged in user is the same user whose data we are trying to access 
    if (req.session.userId !== res.locals.user.id) {
      return res.status(401).render('error')
    }

    console.log(res.locals)    
        

    res.locals.loggedInUserId = req.session.userId;

    console.log(res.locals.loggedInUserId)
    next();
  };
};

module.exports = correctUserMW;