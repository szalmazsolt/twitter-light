const getTweetMW = (objectRepo) => {
  const { tweetModel } = objectRepo;

  return (req, res, next) => {
    const tweet = tweetModel.findOne({ id: req.params.id });

    if (tweet === null) {
      return res.status(404).render(error);
    }

    res.locals.tweet = tweet;
    next();
  };
};

module.exports = getTweetMW;