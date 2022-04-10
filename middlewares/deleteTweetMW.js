const deleteTweetMW = (objectRepo) => {
  const { tweetModel } = objectRepo;

  return (req, res, next) => {

    tweetModel.remove(res.locals.tweet);

    next();

  };
};

module.exports = deleteTweetMW;