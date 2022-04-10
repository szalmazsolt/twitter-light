const getTweetsMW = (objectRepo) => {
  const { tweetModel } = objectRepo;

  return (req, res, next) => {

    // chaining methods on Loki models
    //     // we must start with chain()
    //     // simplesort(property, isDesc)
    //     // chain return a ResultSet, so we need to use data() to turn it into an array
    const tweets = tweetModel
      .chain()
      .find()
      .simplesort('createdAt', true)
      .data();

    if (tweets === null) {
      return res.status(500).render('error');
    }

    res.locals.tweets = tweets;
    return next();
  };
};

module.exports = getTweetsMW;