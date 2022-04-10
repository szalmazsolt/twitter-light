const updateTweetMW = (objectRepo) => {

  const { tweetModel } = objectRepo;

  return (req, res, next) => {

    res.locals.tweet.text = req.body.text || res.locals.tweet.text;
    tweetModel.update(res.locals.tweet)

    next();
  };
};

module.exports = updateTweetMW;