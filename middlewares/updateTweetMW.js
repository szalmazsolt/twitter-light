const updateTweetMW = (objectRepo) => {

  const { tweetModel } = objectRepo;

  return (req, res, next) => {

    res.locals.tweet.text = req.body.text || res.locals.tweet.text;
    res.locals.tweet.updatedAt = new Date().getTime();
    tweetModel.update(res.locals.tweet)

    next();
  };
};

module.exports = updateTweetMW;