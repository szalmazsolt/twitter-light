const correctTweetUserMW = () => {

  return (req, res, next) => {
    if (req.session.userId !== res.locals.tweet.user.id) {
      return res.status(401).render('error');
    };

    next();
  };

};

module.exports = correctTweetUserMW;